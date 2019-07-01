import { GifsService } from './../core/services/gifs.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Gif } from 'app/core/models/gif.model';
declare var $: any;

@Component({
  selector: 'app-gifs',
  templateUrl: './gifs.component.html',
  styleUrls: ['./gifs.component.css']
})
export class GifsComponent implements OnInit {
  gifs: Gif;
  form = this.fb.group({
    query: ['', Validators.required],
  });
  query: string;
  trendingGifs: Gif;
  gifSelected: Gif;
  constructor(private fb: FormBuilder, public gifsService: GifsService) { }

  ngOnInit() {
    this.loadTrending();
  }

  loadTrending() {
    this.gifsService.getTrending().then((data: Gif) => {
      this.trendingGifs = data;
    }, err => {
      console.error('Err:', err);
    })
  }

  search() {
    this.query = this.form.value.query;
    this.gifsService.search(this.query).then((data: Gif) => {
      this.gifs = data;
    }, err => {
      console.error('Err:', err);
    })
  }

  openGif(gif: Gif) {
    this.gifSelected = gif;
    $('#exampleModal').modal('show');
  }
}

