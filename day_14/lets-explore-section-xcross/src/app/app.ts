import {
  Component,
  inject,
  signal,
  TemplateRef,
  WritableSignal,
} from '@angular/core';

import {
  ModalDismissReasons,
  NgbModal,
  NgbModalRef,
  NgbOffcanvas,
  NgbOffcanvasRef,
  OffcanvasDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-about',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class AppComponent {
  //offcanvas
  private offcanvasService = inject(NgbOffcanvas);
  private level_one!: NgbOffcanvasRef;
  closeResult: WritableSignal<string> = signal('');

  //
  info_data: any = [
    {
      icon: 'fa-desktop',
      title: 'Your Ultimate Digital Agency',
      info: 'Experience a new twist of Digital Marketing where intoxicating creative strategy drives leads and engagement and catapults sales.',
    },
    {
      icon: 'fa-arrows-alt',
      title: 'Our Unique Approach',
      info: 'We collaborate with our partners to develop comprehensive digital marketing strategies that are predictable, repeatable, and, most importantly, yield strong returns.',
    },
    {
      icon: 'fa-heart',
      title: 'We pour our heart Into every design',
      info: 'We do what we do because we love it and are dedicated to creating meaningful work. That’s why clients hire us. Our heart is set on their goals.',
    },
    {
      icon: 'fa-lightbulb',
      title: 'We are creative people with big dreams',
      info: 'We produce awesome visuals. Full of energy, drive, and passion, our team aims to deliver the most outstanding work in every pixel.',
    },
  ];

  service_data: any = [
    { name: 'Consulting' },
    { name: 'Branding' },
    { name: 'Web Design' },
    { name: 'Development' },
    { name: 'Marketing' },
    { name: 'Ecommerce' },
    { name: 'Advertising' },
    { name: 'Copywriting' },
    { name: 'Publishing' },
    { name: 'SEM' },
    { name: 'HR' },
    { name: 'Digital Products' },
    { name: 'Hosting' },
    { name: 'Maintenance' },
  ];

  //swiper
  work_breakpoints = {
    320: {
      slidesPerView: 1,
    },
    480: {
      slidesPerView: 2,
    },
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 3,
    },
  };

  partner_breakpoints = {
    320: {
      slidesPerView: 3,
    },
    480: {
      slidesPerView: 3,
    },
    640: {
      slidesPerView: 4,
    },
    768: {
      slidesPerView: 6,
    },
    1024: {
      slidesPerView: 7,
    },
  };

  //offcanvas
  open_offcanvas(content: TemplateRef<any>) {
    this.level_one = this.offcanvasService.open(content, {
      ariaLabelledBy: 'offcanvas-basic-title',
      position: 'end',
    });
    this.level_one.result.then(
      (result) => {
        this.closeResult.set(`Closed with: ${result}`);
      },
      (reason) => {
        this.closeResult.set(`Dismissed ${this.getDismissReason(reason)}`);
      }
    );
  }

  close_level1() {
    if (this.level_one) {
      this.level_one.close();
    }
  }

  private getDismissReason(reason: any): string {
    switch (reason) {
      case OffcanvasDismissReasons.ESC:
        return 'by pressing ESC';
      case OffcanvasDismissReasons.BACKDROP_CLICK:
        return 'by clicking on the backdrop';
      default:
        return `with: ${reason}`;
    }
  }
}
