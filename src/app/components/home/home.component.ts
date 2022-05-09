import {Component} from '@angular/core';
import {Observable} from "rxjs";
import * as moment from "moment";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  playing = false;
  currentTime = '00.00.00';
  duration = '00.00.00';
  seek = 0;

  constructor() {
  }

  audioFiles = new Audio();

  files = [
    {
      name: "Doobey- Gehraiyaan",
      url: "/assets/data/DoobeyGehraiyaan.mp3"
    },
    {
      name: "Raataan Lambiyaan- Shershah",
      url: "/assets/data/RaataanLambiyan.mp3"
    },
    {
      name: "Oo Bolega Ya- Pushpa",
      url: "/assets/data/OoBolegaYa.mp3"
    },
    {
      name: "Paani Paani- Badshah",
      url: "/assets/data/PaaniPaani.mp3"
    },
    {
      name: "Bachpan Ka Pyaar- Badshah",
      url: "/assets/data/BachpanKaPyaar.mp3"
    },

  ]

  audioEvents = [
    "play",
    "playing",
    "pause",
    "timeupdate",
    "canplay",
    "loadedmetadata",
    "loadstart"
  ];


  playMusic(url: string) {
    this.streamObserver(url).subscribe(event => {
    });
    this.playing = true;
  }

  play() {
    this.audioFiles.play();
  }

  pause() {
    this.audioFiles.pause();
    this.playing = false;
  }

  stop() {
    this.audioFiles.pause();
    this.audioFiles.currentTime = 0;
    this.playing = false;
  }

  adjustVolume(e: any) {
    this.audioFiles.volume = e.target.value;
  }

  // for seeking music
  streamObserver(url: string) {
    return new Observable(observer => {
      this.audioFiles.src = url;
      this.audioFiles.play();

      const handler = (event: Event) => {
        this.duration = this.formatTime(this.audioFiles.duration);
        this.currentTime = this.formatTime(this.audioFiles.currentTime);
        this.seek = this.audioFiles.currentTime;
      }

      this.addEvent(this.audioFiles, this.audioEvents, handler);
      return () => {
        this.audioFiles.pause();
        this.audioFiles.currentTime = 0;

        this.removeEvent(this.audioFiles, this.audioEvents, handler);
      }
    });
  }

  addEvent(obj: any, events: any, handler: any) {
    events.forEach((event: any) => {
      obj.addEventListener(event, handler);
    });
  }

  removeEvent(obj: any, events: any, handler: any) {
    events.forEach((event: any) => {
      obj.removeEventListener(event, handler);
    });
  }

  // time format for duration of song
  // for this install 2 dependencies, npm moment-duration-format and npm add @types/moment-duration-format
  formatTime(time: number, format: string = "HH:mm:ss") {
    const momentTime = time * 1000;
    return moment.utc(momentTime).format(format);
  }

  // to seek current music
  seekMusic(e: any) {
    this.audioFiles.currentTime = e.target.value;
  }


}
