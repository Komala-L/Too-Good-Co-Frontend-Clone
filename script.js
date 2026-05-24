function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
locomotiveAnimation()

function navbar() {
gsap.set("#twogoodlogo", { opacity: 0, y: 20, scale: 0.9 });

const logoSwapTl = gsap.timeline({
  scrollTrigger: {
    trigger: ".page1",
    scroller: ".main",
    start: "top top",
    end: "+=120",
    scrub: true
  }
});

logoSwapTl.to("#twogood", {
  y: -60,
  opacity: 0,
  ease: "power2.out"
}, 0);

logoSwapTl.to("#twogoodlogo", {
  opacity: 1,
  y: 0,
  scale: 1,
  ease: "power2.out"
}, 0);

gsap.to(".nav-bar_2 span" ,{
  transform:"translateY(-100%)",
  opacity:0,
  scrollTrigger:{
    trigger:"page1",
    scroller:".main",
    start:"top 0",
    end:"top -5%",
    scrub:true
  }
})
}
navbar()

function timeOut() {
  document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.querySelector(".page1").classList.add("show");
  }, 600); // 0.6 second delay
});
}
timeOut()

function play_video() {
const play = document.querySelector("#play");

const video = document.querySelector(".video");

video.addEventListener("mousemove",function(dets) {
  play.style.left = dets.x+"px";
  play.style.top = dets.y+"px";
});

video.addEventListener("mouseenter",function() {
  play.style.opacity = 1;
  play.style.scale = 1;
});

video.addEventListener("mouseleave",function() {
  play.style.opacity = 0;
  play.style.scale = 0;
});
}
play_video()

function circle() {
  const cursor = document.querySelector(".cursor");
  document.addEventListener("mousemove", function(dets) {
    cursor.style.left = dets.x+"px";
    cursor.style.top = dets.y+"px";
  })

  document.querySelector("#child1").addEventListener("mouseenter", function() {
    cursor.style.transform = "translate(-50%, -50%) scale(1)"
  })

  document.querySelector("#child1").addEventListener("mouseleave", function() {
    cursor.style.transform = "translate(-50%, -50%) scale(0)"
  })

  document.querySelectorAll(".child").forEach(function(elem) {
    elem.addEventListener("mouseenter", function() {
      cursor.style.transform = "translate(-50%, -50%) scale(1)"
    });
    elem.addEventListener("mouseleave", function() {
      cursor.style.transform = "translate(-50%, -50%) scale(0)"
  });
  });
}
circle()