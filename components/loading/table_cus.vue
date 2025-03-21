<template>
    <div 
        class="w-full flex justify-center items-center">
        <div 
            class="scene">
            <div 
                class="cube-wrapper">
                <div 
                    class="cube">
                    <div 
                        class="cube-faces">
                        <div class="cube-face shadow"></div>
                        <div class="cube-face bottom"></div>
                        <div class="cube-face top"></div>
                        <div class="cube-face left"></div>
                        <div class="cube-face right"></div>
                        <div class="cube-face back"></div>
                        <div class=".cube-face front"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>
@use 'sass:math';

$light-cyan: #d6fff6ff;
$medium-turquoise: #17139C;
$russian-violet: rgb(97, 83, 198);
$french-blue: #2374abff;
$light-coral: #F2F2F2;

$size: 50px;
$animation-duration: 2s;

* {
  font-family: 'Albert Sans', sans-serif;
  font-size: inherit;
}

body {
  background-color: $light-coral;
  height: 100vh;
  display: grid;
  place-items: center;
  position: relative;
}

.scene {
  position: relative;
  z-index: 2;
  height: math.div($size * 2.75, 1);
  width: math.div($size * 2.75, 1);
  display: grid;
  place-items: center;
}

.cube-wrapper {
  transform-style: preserve-3d;
  animation: bouncing $animation-duration infinite;
}

.cube {
  transform-style: preserve-3d;
  transform: rotateX(45deg) rotateZ(45deg);
  animation: rotation $animation-duration infinite;
}

.cube-faces {
  transform-style: preserve-3d;
  height: $size;
  width: $size;
  position: relative;
  transform-origin: 0 0;
  transform: translateX(0) translateY(0) translateZ(math.div(-$size, 2));
}

.cube-face {
  position: absolute;
  inset: 0;
  background: $russian-violet;
  border: solid 1px $light-coral;
  &.shadow {
    transform: translateZ(math.div(-$size, 1));
    animation: bouncing-shadow $animation-duration infinite;
  }
  &.top {
    transform: translateZ($size);
  }
  &.front {
    transform-origin: 0 50%;
    transform: rotateY(-90deg);
  }
  &.back {
    transform-origin: 0 50%;
    transform: rotateY(-90deg) translateZ(math.div(-$size, 1));
  }
  &.right {
    transform-origin: 50% 0;
    transform: rotateX(-90deg) translateY(math.div(-$size, 1));
  }
  &.left {
    transform-origin: 50% 0;
    transform: rotateX(-90deg) translateY(math.div(-$size, 1)) translateZ($size);
  }
}

@keyframes rotation {
  $start: 45deg;
  
  0% {
    transform: rotateX($start) rotateY(0) rotateZ($start);
    animation-timing-function: cubic-bezier(0.17,0.84,0.44,1);
  }
  50% {
    transform: rotateX($start) rotateY(0) rotateZ($start + math.div(360, 2));
    animation-timing-function: cubic-bezier(0.76,0.05,0.86,0.06);
  }
  100% {
    transform: rotateX($start) rotateY(0) rotateZ($start + 360);
    animation-timing-function: cubic-bezier(0.17,0.84,0.44,1);
  }
}

@keyframes bouncing {
  0% {
    transform: translateY(math.div(-$size, 2));
    animation-timing-function: cubic-bezier(0.76, 0.05, 0.86, 0.06);
  }

  45% {
    transform: translateY(math.div($size, 2));
    animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
  }

  100% {
    transform: translateY(math.div(-$size, 2));
    animation-timing-function: cubic-bezier(0.76, 0.05, 0.86, 0.06);
  }
}

@keyframes bouncing-shadow {
  0% {
    transform: translateZ(math.div(-$size, 1)) scale(1.3);
    animation-timing-function: cubic-bezier(0.76, 0.05, 0.86, 0.06);
    opacity: .05;
  }

  45% {
    transform: translateZ(0);
    animation-timing-function: cubic-bezier(0.23, 1, 0.32, 1);
    opacity: .3;
  }

  100% {
    transform: translateZ(math.div(-$size, 1)) scale(1.3);
    animation-timing-function: cubic-bezier(0.76, 0.05, 0.86, 0.06);
    opacity: .05;
  }
}
</style>