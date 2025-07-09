import { AfterViewInit, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { delay, interval } from 'rxjs';
declare var ScrollReveal: any;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit {
  protected title = 'my-project';

  ngAfterViewInit(): void {

    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.getElementById('hamburger');

    // Toggle nav on hamburger click
    if (hamburger && navMenu) {
      hamburger.addEventListener('click', () => {
        navMenu?.classList.toggle('left-[0]');
        navMenu?.classList.toggle('left-[-100%]');
        hamburger?.classList.toggle('ri-menu-2-line');
        hamburger?.classList.toggle('ri-close-large-line');
      });
    }

    // Hide nav on link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu?.classList.contains('left-[0]')) {
          navMenu?.classList.remove('left-[0]');
          navMenu?.classList.add('left-[-100%]');
          hamburger?.classList.remove('ri-close-large-line');
          hamburger?.classList.add('ri-menu-2-line');
        }
      });
    });

    // show scroll up
    const scrollup =()=>{
      const scrollupBtn = document.getElementById('scroll-up');
      
      if(window.scrollY >= 250){
        scrollupBtn?.classList.remove('-bottom-1/2');
        scrollupBtn?.classList.add('bottom-10');
      }else{
        scrollupBtn?.classList.remove('bottom-10');
        scrollupBtn?.classList.add('-bottom-1/2');
      }
    }

    window.addEventListener('scroll', scrollup)

    // scroll section active link

     const activeLink = () => {
      const sections = document.querySelectorAll('section');
      const navLinks = document.querySelectorAll('.nav-link');


      let current = "hero";

      sections.forEach(section => {
        const sectionTop = section.offsetTop;

        if (window.scrollY >= sectionTop - 60) {
          current = section.getAttribute("id") || "hero";
        }
      });

      navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
      });
    };

    window.addEventListener('scroll', activeLink);

     /*~~~~~~~~ scrollReveal Animation ~~~~~~~~*/
    window.addEventListener('load', () => {
      const sr = ScrollReveal({
        origin: "top",
        distance: "60px",
        duration: 2500,
        delay: 300,
        reset: true
      });

      sr.reveal(`.hero_big-text, .collection_top, .popular_top, .about_top, .footer_content`);
      sr.reveal(`.hero_image` ,{ origin:"bottom", delay:500});
      sr.reveal(`.hero_content` ,{ origin:"bottom", delay:1000});
      sr.reveal(`.collection_card, .popular_card-3, .banner_content` ,{ interval:100});
      sr.reveal(`.popular_card-1, .about_image` ,{ origin:"left"});
      sr.reveal(`.popular_card-2, .about_content` ,{ origin:"right"});
       

    });
  }
}
