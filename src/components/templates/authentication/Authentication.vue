<template>
  <div class="global__fullscreen-modal authentication">
    <div class="body-contents text-center">
      <div class="back" v-if="!onMainView && !loggedIn && !loading" @click="back()">
        <font-awesome-icon icon="chevron-left" />
        <span>Back to options</span>
      </div>
      <div class="closer" @click="close()">
        <font-awesome-icon icon="times" />
      </div>
      <div class="main" v-if="loading">
        <loader />
      </div>

      <div class="main text-center" v-else-if="error.length > 0">
        <h2 class="text-3xl font-bold">Something went wrong.</h2>
        <p class="text-red-400 font-bold mt-6 mb-8">{{ error }}</p>

        <div v-if="fatalAccountError" class="text-left mb-8">
          <p>We've listed the most common issues in order below.</p>
          <ul class="list-decimal pl-6 my-4 leading-relaxed">
            <li>Ensure you're using the correct Microsoft Account.</li>
            <li>You don't own <b class="font-bold">Minecraft: Java Edition</b> on this Microsoft account</li>
            <li>You may be attempting to use an under 18s account. Your account will need to be added <a @click="openExternal" href="https://go.ftb.team/ms-support-family-account">to a Family account.</a></li>
            <li>You're trying to use Gamepass and have not used the official Minecraft Launcher at least once or in a while. Try Launching Vanilla Minecraft using the Minecraft Launcher. Then attempt to login again.</li>
          </ul>

          <p class="opacity-50">Sorry for any inconvenience.</p>
        </div>

        <ftb-button color="primary" class="px-6 py-4" @click="() => close()">Close</ftb-button>
      </div>

      <div class="main" v-else-if="onMainView && !loggedIn">
        <h3 class="text-2xl mb-4"><b>Minecraft Login</b></h3>
        <p class="mb-8">
          Use your Microsoft account to Login into your Minecraft account
        </p>

        <button @click="() => startDeviceFlow()">
          Login with Device codes
        </button>
        
        <button
          class="actionable-button"
          @click="
            () => {
              onMsAuth = true;
              onMainView = false;
            }
          "
        >
          <img src="@/assets/images/branding/microsoft.svg" alt="Microsoft Login" />
        </button>
      </div>

      <div class="logged-in text-center" v-else-if="loggedIn">
        <h2 class="mb-4 text-3xl font-bold">You're set!</h2>
        <p>You can add & remove profiles by using the profile switcher in the bottom left of the App.</p>
        <div class="checks">
          <font-awesome-icon icon="check" class="my-20 one" size="5x" />
          <font-awesome-icon icon="check" class="my-20 two" size="5x" />
          <font-awesome-icon icon="check" class="my-20 three" size="5x" />
          <font-awesome-icon icon="check" class="my-20 four" size="5x" />
        </div>
        <ftb-button color="primary" class="px-6 py-4" @click="() => close()">Finish</ftb-button>
      </div>

      <div class="auth-views" v-else>
        <microsoft-auth @authenticated="authenticated()" @error="onError" />
      </div>
    </div>

    <div class="device-flow" v-if="deviceFlow">
      Hello

      <div>deviceFlow: {{deviceFlow}}</div>
      <div>deviceFlowCode: {{deviceFlowCode}}</div>
      <div>deviceFlowExpiresIn: {{deviceFlowExpiresIn}}</div>
      <div>deviceFlowSecondsSinceStart: {{deviceFlowSecondsSinceStart}}</div>
      <div>deviceFlowInitialised: {{deviceFlowInitialised}}</div>
      <div>deviceFlowError: {{deviceFlowError}}</div>
      <div>deviceFlowTimeoutRef: {{deviceFlowTimeoutRef}}</div>
      <div>deviceFlowApplicationId: {{deviceFlowApplicationId}}</div>
      <div>deviceFlowDeviceCode: {{deviceFlowDeviceCode}}</div>
      <div>deviceFlowVerificationUrl: {{deviceFlowVerificationUrl}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import {Action} from 'vuex-class';
import MicrosoftAuth from '@/components/templates/authentication/MicrosoftAuth.vue';
import {Prop} from 'vue-property-decorator';
import {RouterNames} from '@/router';
import Loader from '@/components/atoms/Loader.vue';

@Component({
  components: {Loader, MicrosoftAuth},
})
export default class Authentication extends Vue {
  @Action('loadProfiles', { namespace: 'core' }) public loadProfiles: any;
  
  @Prop() public uuid!: string;
  @Prop() public tryAgainInstanceUuid!: any;

  onMainView = true;
  loggedIn = false;
  error = '';
  loading = false;

  onMsAuth = false;

  fatalAccountError = false;
  
  deviceFlow = false;
  deviceFlowCode = "";
  deviceFlowExpiresIn = -1;
  deviceFlowSecondsSinceStart = 0;
  deviceFlowInitialised = false;
  deviceFlowError = "";
  deviceFlowTimeoutRef: number | null = null;
  deviceFlowApplicationId = "f23e8ba8-f46b-41ed-b5c0-7994f2ebbbf8";
  deviceFlowDeviceCode = "";
  deviceFlowVerificationUrl = "";
  
  public mounted() {
  }

  destroyed() {
    if (this.deviceFlowTimeoutRef) {
      window.clearInterval(this.deviceFlowTimeoutRef);
    }
  }
  
  back() {
    this.onMainView = true;
    this.onMsAuth = false;
    this.error = '';
    this.fatalAccountError = false;
  }

  authenticated() {
    this.loggedIn = true;
    this.back();
  }

  close() {
    if (this.tryAgainInstanceUuid && this.loggedIn) {
      this.$router.push({ name: RouterNames.ROOT_LAUNCH_PACK, query: { uuid: this.tryAgainInstanceUuid } });
    }

    this.$emit('close');
  }

  async startDeviceFlow() {
    this.deviceFlow = true;
    this.deviceFlowInitialised = false;
    this.deviceFlowError = "";
    this.deviceFlowCode = "";
    this.deviceFlowExpiresIn = -1;
    this.deviceFlowSecondsSinceStart = 0;
    this.deviceFlowTimeoutRef = null;
    this.deviceFlowDeviceCode = "";
    this.deviceFlowVerificationUrl = "";
    
    this.deviceFlowTimeoutRef = window.setInterval(() => {
      this.deviceFlowSecondsSinceStart += 1;
      this.pollDeviceFlow();
    }, 1000);
    
    // Request a device code
    const req = await fetch(`https://login.microsoftonline.com/common/oauth2/v2.0/devicecode`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        client_id: this.deviceFlowApplicationId,
        scope: "offline_access xboxlive.signin" // Same as our own auth service
      }).toString()
    })
    
    const data = await req?.json();
    console.log("Got device code", data)
    if (!data) {
      this.deviceFlowError = "Failed to get device code";
      return;
    }
    
    this.deviceFlowCode = data.user_code;
    this.deviceFlowDeviceCode = data.device_code;
    this.deviceFlowVerificationUrl = data.verification_uri;
    this.deviceFlowExpiresIn = data.expires_in;
    this.deviceFlowInitialised = true;
  }

  pollDeviceFlow() {
    if (!this.deviceFlowInitialised || !this.deviceFlowCode || !this.deviceFlowDeviceCode) {
      return;
    }
    
    if (this.deviceFlowSecondsSinceStart >= this.deviceFlowExpiresIn) {
      this.deviceFlowError = "Device code expired";
      if (this.deviceFlowTimeoutRef) {
        clearInterval(this.deviceFlowTimeoutRef!);
      }
      return;
    }
    
    // Poll for auth
    
    console.log("Polling for auth");
  }
  
  onError(e: string, type?: string) {
    this.error = e;
    if (type && type === 'final') {
      this.fatalAccountError = true;
    }
  }
}
</script>

<style lang="scss" scoped>
a[href] {
  text-decoration: underline;
}

.authentication {
  .login-with-legacy {
    cursor: pointer;
    
    &:hover {
      text-decoration: underline;
    }
  }

  .or {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1.5rem 0;
    position: relative;

    &::after {
      background-color: rgba(white, 0.2);
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      transform: translatey(-50%);
      height: 2px;
      border-radius: 4px;
      width: 100%;
      z-index: -1;
    }

    span {
      background-color: #313131;
      padding: 0 3rem;
      text-transform: uppercase;
      font-weight: bold;
      color: rgba(white, 0.25);
    }
  }


  .checks {
    svg {
      color: var(--color-primary-button);
      transform: translateY(-5px) scale(0.9);
    }

    .fa-check {
      animation: fadeInFadeOut 3.5s ease-in-out infinite;
    }

    .two {
      animation-delay: 0.5s;
    }

    .three {
      animation-delay: 1s;
    }

    .four {
      animation-delay: 1.5s;
    }

    @keyframes fadeInFadeOut {
      0%,
      100% {
        color: var(--color-primary-button);
        transform: translateY(-5px) scale(0.9);
      }
      50% {
        color: white;
        transform: translateY(20px) scale(1);
      }
    }
  }
}
</style>
