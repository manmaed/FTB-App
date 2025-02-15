<template>
  <div class="ui-button-holder" :aria-label="ariaLabel ? ariaLabel : undefined" :data-balloon-pos="ariaLabel && ariaLabelPos ? ariaLabelPos : undefined" :class="{'disabled': working || disabled}">
    <div 
      :class="[`ui-button ${colorFromType}`, {fullWidth, wider, 'disabled': working || disabled}, [size]]" 
      @click="click"
    >
      <span :class="{'opacity-0': working}">
        <font-awesome-icon :fixedWidth="true" v-if="icon" :icon="icon" :class="{'mr-2': $slots['default']}" />
        <slot />
      </span>
      <transition name="fade">
        <span v-if="working" class="absolute inset-0 flex items-center justify-center">
          <font-awesome-icon :fixedWidth="true" icon="spinner" spin />
        </span>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import {IconDefinition} from '@fortawesome/free-solid-svg-icons';
import {Component, Prop, Vue} from 'vue-property-decorator';

export type ElementColorType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'normal';
export type ElementAriaDirection = "up" | "down" | "left" | "right" | "up-left" | "up-right" | "down-left" | "down-right";
export type ElementStandardSizing = 'small' | 'normal' | 'large';

@Component
export default class UiButton extends Vue {
  @Prop({ default: 'normal' }) type!: ElementColorType;
  @Prop({ default: 'normal' }) size!: ElementStandardSizing;
  @Prop() disabled!: boolean;
  @Prop() working!: boolean;
  @Prop() icon!: IconDefinition;
  
  @Prop({ default: false }) fullWidth!: boolean;
  @Prop({ default: false }) wider!: boolean;
  
  @Prop({ default: "" }) ariaLabel!: string;
  @Prop({ default: "down" as ElementAriaDirection }) ariaLabelPos!: ElementAriaDirection;
  
  click(event: MouseEvent) {
    if (this.disabled || this.working) {
      return;
    }
    
    this.$emit('click', event);
  }
  
  get colorFromType() {
    return UiButton.colorFromElementColorType(this.type, this.disabled, this.working);
  }
  
  public static colorFromElementColorType(type: ElementColorType, disabled: boolean = false, working = false) {
    switch (type) {
      case 'primary': return 'bg-indigo-600' + (!disabled && !working ? ' hover:bg-indigo-500' : '');
      case 'secondary': return 'bg-green-600' + (!disabled && !working ? ' hover:bg-green-500' : '');
      case 'success': return 'bg-primary' + (!disabled && !working ? ' hover:bg-light-primary' : '');
      case 'danger': return 'bg-danger' + (!disabled && !working ? ' hover:bg-light-danger' : '');
      case 'warning': return 'bg-warning' + (!disabled && !working ? ' hover:bg-light-warning' : '');
      case 'info': return 'bg-info' + (!disabled && !working ? ' hover:bg-light-info' : '');
      case 'normal': return 'bg-gray-600' + (!disabled && !working ? ' hover:bg-gray-500' : '');
    }
  }
}
</script>

<style scoped lang="scss">
.ui-button-holder {
  &.disabled {
    cursor: not-allowed;
  }
}

.ui-button {
  border-radius: 3px;
  position: relative;
  padding: 0.75em .8em;
  display: inline-block;
  font-size: 14px;
  text-align: center;
  font-weight: bold;
  transition: background-color .25s ease-in-out, opacity .25s ease-in-out;
  cursor: pointer;

  &.wider {
    padding: 0.75em 2em;
  }
  
  span {
    cursor: pointer;
    transition: opacity .25s ease-in-out;
  }
  
  &.fullWidth {
    display: block;
    width: 100%;
  }
  
  &.small {
    padding: 0.6em .6em;
    font-size: 0.875em;
    &.wider {
      padding: 0.4em 1.8em;
    }
  }
  
  &.large {
    font-size: 1.1275em;
    padding: 0.8em 1.1em; 
    
    &.wider {
      padding: 0.8em 2.4em;
    }
  }
  
  &.disabled {
    opacity: .6;
    cursor: not-allowed;
  }
}
</style>