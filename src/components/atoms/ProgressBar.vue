<template>
  <div class="progress" :class="{'infinite': infinite, 'animated': doProgressAnimation, [type]: true}">
    <div class="bar" :style="{
      width: inverted ? `${100 - progress * 100}%` : `${progress * 100}%`,
    }"></div>
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

type ProgressType = "primary" | "muted"

@Component
export default class ProgressBar extends Vue {
  @Prop({ default: 0 }) progress!: number;
  @Prop({ default: false }) infinite!: boolean;
  
  @Prop({default: true}) doProgressAnimation!: boolean;
  
  @Prop({default: 'primary'}) type!: ProgressType;
  @Prop({default: false}) inverted!: boolean;
}
</script>

<style lang="scss" scoped>
.progress {
  width: 100%;
  height: 10px;
  background: #151515;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  
  .bar {
    height: 100%;
    background: var(--color-primary-button);
  }
  
  &.muted .bar {
    @apply bg-gray-700;
  }

  &.animated::after {
    content: '';
    top: 0;
    width: 100%;
    height: 100%;
    background: white;
    position: absolute;
    left: -100%;

    animation: leftToRight 3s ease-in-out infinite;

    @keyframes leftToRight {
      0% {
        opacity: 0.08;
        left: -100%;
      }
      50% {
        opacity: 0.15;
        left: 0;
      }
      100% {
        opacity: 0.08;
        left: 100%;
      }
    }
  }

  &.infinite::after {
    background-color: var(--color-primary-button);
    animation: leftToRight2 3s ease-in-out infinite;

    @keyframes leftToRight2 {
      0% {
        opacity: .8;
        left: -100%;
      }
      50% {
        opacity: 1;
        left: 0;
      }
      100% {
        opacity: .8;
        left: 100%;
      }
    }
  }
}
</style>
