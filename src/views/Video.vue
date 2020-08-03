<template>
  <v-container class="px-3 container">
    <v-row>
      <v-col cols="12">
        <div id="resizable" class="ui-widget-content">
          <video class="video" loop muted></video>
          <canvas id="canv"></canvas>
        </div>

        <input type="file" id="video_selector" accept=".mkv, video/*" />
        <div class="hide_until_load hidden pa-2">
          <span class="current_time"></span>
          <div class="slider_wrapper px-4">
            <div id="slider"></div>
            <div class="slider_time_pos"></div>
          </div>
          <v-row class="px-2 mb-5">
            <v-col cols="12 pa-0 mb-3" md="6">
              Start:
              <input type="number" class="slider_control" data-pos="0" value="0" title="Start" />
            </v-col>
            <v-col cols="12 pa-0 mb-3" md="6">
              End:
              <input type="number" class="slider_control" data-pos="1" value="1" title="End" />
            </v-col>
            <v-col cols="6">
              <button class="play_toggle" @click="pause_toggle()">&#10074;&#10074;</button>
            </v-col>
            <v-col class="d-flex align-center justify-center" cols="6">
              <label for="mute_toggle">Mute:</label>
              <input type="checkbox" id="mute_toggle" checked />
            </v-col>
          </v-row>

          <!-- <v-btn type="button" id="run_ffmpeg" value="Run FFmpeg in-browser!" /> -->
          <v-btn id="run_ffmpeg" block color="primary">Trim</v-btn>

          <div class="ffmpeg_log">
            Running FFmpeg in-browser is unstable, and may crash. It will not work on large files.
            It may also take a while to get started, as it must download a large (26Mb) library to run.
          </div>

          <div class="download_links"></div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Video",

  data: () => ({
    article: "",
  }),
  methods: {
    pause_toggle() {
      let video = document.querySelector(".video");
      console.log("toggle play");
      if (video.paused) {
        video.play().finally(() => {
          $(".play_toggle").html("&#10074;&#10074;");
        });
      } else {
        video.pause();
        $(".play_toggle").html("&#9654;");
      }
    },
  },
  created: function () {
    $(function () {
      console.log(document.getElementById("canv"));

      let video = document.querySelector(".video");
      const canvas = document.getElementById("canv");
      const ctx = canvas.getContext("2d");
      let slider = document.getElementById("slider");

      let video_size = { w: 0, h: 0 };
      let filename = "in.mp4";
      let time_start = 0;
      let time_end = 1;
      let crop = [null, null];
      let ffmpeg = null;
      let selected_file = null;
      let heap_limit = null;

      $(function () {
        console.log("Loaded DOM.");
        ffmpeg = new FFMPEG(document.querySelector(".download_links"));
        try {
          heap_limit = performance.memory.jsHeapSizeLimit;
          console.debug("Heap limit found:", heap_limit);
        } catch {}

        $("#video_selector").change(function (e) {
          let fileInput = e.target;
          let fileUrl = window.URL.createObjectURL(fileInput.files[0]);
          filename = fileInput.files[0].name;
          selected_file = fileInput.files[0];
          $(".video").attr("src", fileUrl);
          e.target.remove();
        });

        $("#mute_toggle").click(function () {
          $(video).prop("muted", !$(video).prop("muted"));
        });

        $(".video")
          .bind("loadedmetadata", function (e) {
            video_size = { w: this.videoWidth, h: this.videoHeight };
            $(".hide_until_load").removeClass("hidden");
            noUiSlider.create(slider, {
              start: [0, this.duration],
              connect: true,
              range: {
                min: 0,
                max: this.duration,
              },
            });
            slider.noUiSlider.on("update", (range) => {
              update_slider_fields(range);
            });
            update_slider_fields();
          })
          .bind("loadeddata", function (e) {
            // noinspection JSIgnoredPromiseFromCall
            e.target.play(); // start playing
          })
          .on("pause", (e) => {
            console.log("Paused: ", e.target.currentTime);
          });

        $(".slider_control").on("change", (e) => {
          set_slider();
        });

        let drawing = false;
        $("#canv")
          .mousedown((e) => {
            let pos = getMousePos(canvas, e);
            drawing = true;
            console.log("click", pos);
            crop = [pos, null];
          })
          .mousemove(function (e) {
            if (!drawing) return;
            let pos = getMousePos(canvas, e);
            crop = [crop[0], pos];
          })
          .on("mouseup", function (e) {
            if (!drawing) return;
            let pos = getMousePos(canvas, e);
            console.log("Mouse Up", pos);
            crop = [crop[0], pos];
            drawing = false;
            if (crop[0].x === crop[1].x && crop[0].y === crop[1].y)
              crop = [null, null];
            console.log(crop);
          });

        $(".slider_time_pos").mousedown((e) => {
          let ele = e.target;
          let last_pos = e.clientX;
          function mup(e, ele) {
            console.log("up");
            document.onmousemove = null;
            document.onmouseup = null;
          }
          function mmov(e, ele) {
            let delta = e.clientX - last_pos;
            console.log("Delta:", delta);
            last_pos = e.clientX;
            let total_percent =
              (ele.offsetLeft + delta) / ele.parentElement.offsetWidth;
            console.log(total_percent);
            video.currentTime = video.duration * total_percent;
          }
          document.onmousemove = (e) => {
            mmov(e, ele);
          };
          document.onmouseup = (e) => {
            mup(e, ele);
          };
        });

        $("#run_ffmpeg").click(() => {
          if (heap_limit) {
            if (
              selected_file.size * 2.5 >
              heap_limit - performance.memory.usedJSHeapSize
            ) {
              if (
                !confirm(
                  "The given file is likely to crash your browser!\nContinue?"
                )
              ) {
                return;
              }
            }
          }
          let cmd = build_ffmpeg_string(true);
          let ts = time_start ? time_start.toFixed(2) : 0;
          let te = time_end ? time_end.toFixed(2) : 0;
          let duration = te - ts;
          let progress_callback = (prog) => {
            if (prog.done) {
              document.querySelector(".ffmpeg_log").textContent =
                "Conversion complete.";
            } else {
              let percent = (prog["time"] / duration) * 100;
              document.querySelector(".ffmpeg_log").textContent =
                percent.toFixed(2) + "% complete.";
            }
          };
          console.log("Running FFMPEG:", cmd);
          ffmpeg.start(selected_file, cmd, progress_callback);
        });
      });

      function update_slider_fields(range) {
        if (!range || range.length < 2) return;
        document.querySelectorAll(".slider_control").forEach(function (input) {
          // noinspection JSUndefinedPropertyAssignment
          input.value = range[input.dataset.pos];
        });
        time_start = parseFloat(range[0]);
        time_end = parseFloat(range[1]);
      }

      function set_slider() {
        let vals = [];
        document.querySelectorAll(".slider_control").forEach(function (input) {
          vals.push(input.value);
        });
        console.log(vals);
        slider.noUiSlider.set(vals);
      }

      function getMousePos(canvas, evt) {
        let rect = canvas.getBoundingClientRect();
        return {
          x: (evt.clientX - rect.left) / rect.width,
          y: (evt.clientY - rect.top) / rect.height,
        };
      }

      function unscale(coords, rect) {
        return {
          x: coords.x * rect.width,
          y: coords.y * rect.height,
        };
      }

      function crop_box(crop, in_width, in_height) {
        let rect = { width: in_width, height: in_height };
        let p1 = unscale(crop[0], rect),
          p2 = unscale(crop[1], rect);
        let x = Math.min(p1.x, p2.x);
        let y = Math.min(p1.y, p2.y);
        let w = Math.abs(p1.x - p2.x);
        let h = Math.abs(p1.y - p2.y);
        return {
          x: Math.floor(x),
          y: Math.floor(y),
          w: Math.floor(w),
          h: Math.floor(h),
        };
      }

      function pause_toggle() {
        console.log("toggle play");
        if (video.paused) {
          video.play().finally(() => {
            $(".play_toggle").html("&#10074;&#10074;");
          });
        } else {
          video.pause();
          $(".play_toggle").html("&#9654;");
        }
      }

      function build_ffmpeg_string(for_browser_run = false) {
        let ts = time_start ? time_start.toFixed(2) : 0;
        let te = time_end ? time_end.toFixed(2) : 0;
        let mpeg = for_browser_run ? "" : "ffmpeg ";
        mpeg += "-ss " + ts + ' -i "' + filename + '"';
        if (for_browser_run && (!crop[0] || !crop[1])) {
          mpeg += " -vf showinfo";
        }
        mpeg += " -movflags faststart -t " + (te - ts).toFixed(4) + " ";
        if (crop[0] && crop[1]) {
          let rect = canvas.getBoundingClientRect();
          let box = crop_box(crop, rect.width, rect.height);
          ctx.strokeStyle = "#FF0000";
          ctx.strokeRect(box.x, box.y, box.w, box.h);
          box = crop_box(crop, video_size.w, video_size.h);
          mpeg +=
            '-filter:v "crop=' +
            box.w +
            ":" +
            box.h +
            ":" +
            box.x +
            ":" +
            box.y;
          if (for_browser_run) {
            mpeg += ", showinfo";
          }
          mpeg += '" ';
        }
        let fn = for_browser_run
          ? encodeURI(filename.replace(/\.[^/.]+$/, "")) + ".mp4"
          : `"edit - ${filename}"`;
        mpeg += `-c:a copy ${fn}`;
        return mpeg;
      }

      function update() {
        canvas.width = $(video).width();
        canvas.height = $(video).height();
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        if (video.currentTime < time_start) video.currentTime = time_start;
        if (video.currentTime > time_end) video.currentTime = time_start;
        let complete_percent = 100 * (video.currentTime / video.duration);
        $(".slider_time_pos").css("left", complete_percent + "%");
        $(".current_time").text(video.currentTime.toFixed(2));
        // noinspection JSCheckFunctionSignatures
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height); //TODO: Subimage using crop.

        let mpeg = build_ffmpeg_string(false);
        if ($(".ffmpeg").text() !== mpeg) {
          $(".ffmpeg").text(mpeg);
        }
        requestAnimationFrame(update.bind(this)); // Tell browser to trigger this method again, next animation frame.
      }

      update(); //Start rendering
    });
  },
};
</script>

<style scoped>
html {
  display: table;
  margin: auto;
}
body {
  display: table-cell;
  vertical-align: middle;
}
input.slider_control {
    border: 2px solid;
    padding: .5rem 1rem;
    border-radius: .25rem;
}
#resizable {
    position: relative;
    width: 100%;
    border: 1px solid black;
    resize: both;
    overflow: hidden;
    padding-top: 56.25%;
}
video, canvas {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
}
#controller {
    z-index: 1!important;
}
.play_toggle {
    width: 90px;
    background: white;
    border: 2px solid black;
    padding: .5rem 1rem;
    border-radius: .25rem;
}
#mute_toggle {
    width: 3rem;
    height: 1.5rem;
}
</style>