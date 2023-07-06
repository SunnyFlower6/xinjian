<template>
  <div class="icons-container">
    <div class="tabs">
      <div class="tabpage" @click="tab='icons'" :class="{'selected': tab=='icons'}">图标</div>
      <div class="tabpage" @click="tab='examples'" :class="{'selected': tab=='examples'}">示例</div>
    </div>
    <div label="图标" name="icons" v-show="tab=='icons'">
      <div class="icons-section" v-for="(iconType, key) in iconTypes" :key="key">
        <h2>{{iconType}}</h2>
        <div class="icons-all">
          <div span="6" v-for="icon in filterIcons(iconType)" :key="icon.id" class="icons-item"><span :class="'fa fa-fw fa-' + icon.id"></span> {{icon.id}}{{iconAliases(icon)}}</div>
        </div>
      </div>
    </div>
    <div label="示例" name="examples" v-show="tab=='examples'">
      <div class="icons-section">
        <h2>Basic Icons</h2>
        <div class="icons-content">
          <div span="6" class="icons-example">
            <span class="fa fa-camera-retro"></span> fa-camera-retro
          </div>
          <div span="18" class="icons-code">
            <div><pre><code class="html"><span class="nt">&lt;i</span> <span class="na">class=</span><span class="s">"fa fa-camera-retro"</span><span class="nt">&gt;&lt;/i&gt;</span> fa-camera-retro</code></pre></div>
          </div>
        </div>
      </div>
      <div class="icons-section">
        <h2>Larger Icons</h2>
        <div class="icons-content">
          <div span="6" class="icons-example">
            <div><span class="fa fa-camera-retro fa-lg"></span> fa-lg</div>
            <div><span class="fa fa-camera-retro fa-2x"></span> fa-2x</div>
            <div><span class="fa fa-camera-retro fa-3x"></span> fa-3x</div>
            <div><span class="fa fa-camera-retro fa-4x"></span> fa-4x</div>
            <div><span class="fa fa-camera-retro fa-5x"></span> fa-5x</div>
          </div>
          <div span="18" class="icons-code">
            <div>
              <pre><code class="html"><span class="nt">&lt;i</span> <span class="na">class=</span><span class="s">"fa fa-camera-retro fa-lg"</span><span class="nt">&gt;&lt;/i&gt;</span> fa-lg
<span class="nt">&lt;i</span> <span class="na">class=</span><span class="s">"fa fa-camera-retro fa-2x"</span><span class="nt">&gt;&lt;/i&gt;</span> fa-2x
<span class="nt">&lt;i</span> <span class="na">class=</span><span class="s">"fa fa-camera-retro fa-3x"</span><span class="nt">&gt;&lt;/i&gt;</span> fa-3x
<span class="nt">&lt;i</span> <span class="na">class=</span><span class="s">"fa fa-camera-retro fa-4x"</span><span class="nt">&gt;&lt;/i&gt;</span> fa-4x
<span class="nt">&lt;i</span> <span class="na">class=</span><span class="s">"fa fa-camera-retro fa-5x"</span><span class="nt">&gt;&lt;/i&gt;</span> fa-5x
</code></pre>
            </div>
          </div>
        </div>
      </div>
      <div class="icons-section">
        <h2>Fixed Width Icons</h2>
        <div class="icons-content">
          <div span="6" class="icons-example">
            <div vertical class="button-group">
              <button style="text-align:left;"><span class="fa fa-home"></span> Home</button>
              <button style="text-align:left;"><span class="fa fa-book"></span> Library</button>
              <button style="text-align:left;"><span class="fa fa-pencil"></span> Applications</button>
              <button style="text-align:left;"><span class="fa fa-cog"></span> Settings</button>
            </div>
          </div>
          <div span="18" class="icons-code">
            <div>
              <pre><code class="html"><span class="nt">&lt;div</span> <span class="na">class=</span><span class="s">"list-group"</span><span class="nt">&gt;</span>
  <span class="nt">&lt;a</span> <span class="na">class=</span><span class="s">"list-group-item"</span> <span class="na">href=</span><span class="s">"#"</span><span class="nt">&gt;&lt;i</span> <span class="na">class=</span><span class="s">"fa fa-home fa-fw"</span> <span class="na">aria-hidden=</span><span class="s">"true"</span><span class="nt">&gt;&lt;/i&gt;</span><span class="ni">&amp;nbsp;</span> Home<span class="nt">&lt;/a&gt;</span>
  <span class="nt">&lt;a</span> <span class="na">class=</span><span class="s">"list-group-item"</span> <span class="na">href=</span><span class="s">"#"</span><span class="nt">&gt;&lt;i</span> <span class="na">class=</span><span class="s">"fa fa-book fa-fw"</span> <span class="na">aria-hidden=</span><span class="s">"true"</span><span class="nt">&gt;&lt;/i&gt;</span><span class="ni">&amp;nbsp;</span> Library<span class="nt">&lt;/a&gt;</span>
  <span class="nt">&lt;a</span> <span class="na">class=</span><span class="s">"list-group-item"</span> <span class="na">href=</span><span class="s">"#"</span><span class="nt">&gt;&lt;i</span> <span class="na">class=</span><span class="s">"fa fa-pencil fa-fw"</span> <span class="na">aria-hidden=</span><span class="s">"true"</span><span class="nt">&gt;&lt;/i&gt;</span><span class="ni">&amp;nbsp;</span> Applications<span class="nt">&lt;/a&gt;</span>
  <span class="nt">&lt;a</span> <span class="na">class=</span><span class="s">"list-group-item"</span> <span class="na">href=</span><span class="s">"#"</span><span class="nt">&gt;&lt;i</span> <span class="na">class=</span><span class="s">"fa fa-cog fa-fw"</span> <span class="na">aria-hidden=</span><span class="s">"true"</span><span class="nt">&gt;&lt;/i&gt;</span><span class="ni">&amp;nbsp;</span> Settings<span class="nt">&lt;/a&gt;</span>
<span class="nt">&lt;/div&gt;</span>
</code></pre>
            </div>
          </div>
        </div>
      </div>
      <div class="icons-section">
        <h2>List Icons</h2>
        <div class="icons-content">
          <div span="6" class="icons-example">
            <ul class="fa-ul">
              <li><i class="fa-li fa fa-check-square"></i>List icons</li>
              <li><i class="fa-li fa fa-check-square"></i>can be used</li>
              <li><i class="fa-li fa fa-spinner fa-spin"></i>as bullets</li>
              <li><i class="fa-li fa fa-square"></i>in lists</li>
            </ul>
          </div>
          <div span="18" class="icons-code">
            <div>
              <pre><code class="html"><span class="nt">&lt;ul</span> <span class="na">class=</span><span class="s">"fa-ul"</span><span class="nt">&gt;</span>
  <span class="nt">&lt;li&gt;&lt;i</span> <span class="na">class=</span><span class="s">"fa-li fa fa-check-square"</span><span class="nt">&gt;&lt;/i&gt;</span>List icons<span class="nt">&lt;/li&gt;</span>
  <span class="nt">&lt;li&gt;&lt;i</span> <span class="na">class=</span><span class="s">"fa-li fa fa-check-square"</span><span class="nt">&gt;&lt;/i&gt;</span>can be used<span class="nt">&lt;/li&gt;</span>
  <span class="nt">&lt;li&gt;&lt;i</span> <span class="na">class=</span><span class="s">"fa-li fa fa-spinner fa-spin"</span><span class="nt">&gt;&lt;/i&gt;</span>as bullets<span class="nt">&lt;/li&gt;</span>
  <span class="nt">&lt;li&gt;&lt;i</span> <span class="na">class=</span><span class="s">"fa-li fa fa-square"</span><span class="nt">&gt;&lt;/i&gt;</span>in lists<span class="nt">&lt;/li&gt;</span>
<span class="nt">&lt;/ul&gt;</span>
</code></pre>
            </div>
          </div>
        </div>
      </div>
      <div class="icons-section">
        <h2>Bordered & Pulled Icons</h2>
        <div class="icons-content">
          <div span="6" class="icons-example">
            <i class="fa fa-quote-left fa-3x fa-pull-left fa-border" aria-hidden="true"></i>
...tomordiv we will run faster, stretch out our arms farther...
And then one fine morning&mdash; So we beat on, boats against the
current, borne back ceaselessly into the past.
          </div>
          <div span="18" class="icons-code">
            <div>
              <pre><code class="html"><span class="nt">&lt;i</span> <span class="na">class=</span><span class="s">"fa fa-quote-left fa-3x fa-pull-left fa-border"</span> <span class="na">aria-hidden=</span><span class="s">"true"</span><span class="nt">&gt;&lt;/i&gt;</span>
...tomordiv we will run faster, stretch out our arms farther...
And then one fine morning<span class="ni">&amp;mdash;</span> So we beat on, boats against the
current, borne back ceaselessly into the past.
</code></pre>
            </div>
          </div>
        </div>
      </div>
      <div class="icons-section">
        <h2>Animated Icons</h2>
        <div class="icons-content">
          <div span="6" class="icons-example">
            <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
            <span class="sr-only">Loading...</span>
            <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
            <span class="sr-only">Loading...</span>
            <i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>
            <span class="sr-only">Loading...</span>
            <i class="fa fa-cog fa-spin fa-3x fa-fw"></i>
            <span class="sr-only">Loading...</span>
            <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
            <span class="sr-only">Loading...</span>
          </div>
          <div span="18" class="icons-code">
            <div>
              <pre><code class="html"><span class="nt">&lt;i</span> <span class="na">class=</span><span class="s">"fa fa-spinner fa-spin fa-3x fa-fw"</span><span class="nt">&gt;&lt;/i&gt;</span>
<span class="nt">&lt;span</span> <span class="na">class=</span><span class="s">"sr-only"</span><span class="nt">&gt;</span>Loading...<span class="nt">&lt;/span&gt;</span>

<span class="nt">&lt;i</span> <span class="na">class=</span><span class="s">"fa fa-circle-o-notch fa-spin fa-3x fa-fw"</span><span class="nt">&gt;&lt;/i&gt;</span>
<span class="nt">&lt;span</span> <span class="na">class=</span><span class="s">"sr-only"</span><span class="nt">&gt;</span>Loading...<span class="nt">&lt;/span&gt;</span>

<span class="nt">&lt;i</span> <span class="na">class=</span><span class="s">"fa fa-refresh fa-spin fa-3x fa-fw"</span><span class="nt">&gt;&lt;/i&gt;</span>
<span class="nt">&lt;span</span> <span class="na">class=</span><span class="s">"sr-only"</span><span class="nt">&gt;</span>Loading...<span class="nt">&lt;/span&gt;</span>

<span class="nt">&lt;i</span> <span class="na">class=</span><span class="s">"fa fa-cog fa-spin fa-3x fa-fw"</span><span class="nt">&gt;&lt;/i&gt;</span>
<span class="nt">&lt;span</span> <span class="na">class=</span><span class="s">"sr-only"</span><span class="nt">&gt;</span>Loading...<span class="nt">&lt;/span&gt;</span>

<span class="nt">&lt;i</span> <span class="na">class=</span><span class="s">"fa fa-spinner fa-pulse fa-3x fa-fw"</span><span class="nt">&gt;&lt;/i&gt;</span>
<span class="nt">&lt;span</span> <span class="na">class=</span><span class="s">"sr-only"</span><span class="nt">&gt;</span>Loading...<span class="nt">&lt;/span&gt;</span>
</code></pre>
            </div>
          </div>
        </div>
      </div>
      <div class="icons-section">
        <h2>Rotated & Flipped</h2>
        <div class="icons-content">
          <div span="6" class="icons-example">
            <i class="fa fa-shield"></i> normal<br>
            <i class="fa fa-shield fa-rotate-90"></i> fa-rotate-90<br>
            <i class="fa fa-shield fa-rotate-180"></i> fa-rotate-180<br>
            <i class="fa fa-shield fa-rotate-270"></i> fa-rotate-270<br>
            <i class="fa fa-shield fa-flip-horizontal"></i> fa-flip-horizontal<br>
            <i class="fa fa-shield fa-flip-vertical"></i> fa-flip-vertical
          </div>
          <div span="18" class="icons-code">
            <div>
              <pre><code class="html"><span class="nt">&lt;i</span> <span class="na">class=</span><span class="s">"fa fa-shield"</span><span class="nt">&gt;&lt;/i&gt;</span> normal<span class="nt">&lt;br&gt;</span>
<span class="nt">&lt;i</span> <span class="na">class=</span><span class="s">"fa fa-shield fa-rotate-90"</span><span class="nt">&gt;&lt;/i&gt;</span> fa-rotate-90<span class="nt">&lt;br&gt;</span>
<span class="nt">&lt;i</span> <span class="na">class=</span><span class="s">"fa fa-shield fa-rotate-180"</span><span class="nt">&gt;&lt;/i&gt;</span> fa-rotate-180<span class="nt">&lt;br&gt;</span>
<span class="nt">&lt;i</span> <span class="na">class=</span><span class="s">"fa fa-shield fa-rotate-270"</span><span class="nt">&gt;&lt;/i&gt;</span> fa-rotate-270<span class="nt">&lt;br&gt;</span>
<span class="nt">&lt;i</span> <span class="na">class=</span><span class="s">"fa fa-shield fa-flip-horizontal"</span><span class="nt">&gt;&lt;/i&gt;</span> fa-flip-horizontal<span class="nt">&lt;br&gt;</span>
<span class="nt">&lt;i</span> <span class="na">class=</span><span class="s">"fa fa-shield fa-flip-vertical"</span><span class="nt">&gt;&lt;/i&gt;</span> fa-flip-vertical
</code></pre>
            </div>
          </div>
        </div>
      </div>
      <div class="icons-section">
        <h2>Stacked Icons</h2>
        <div class="icons-content">
          <div span="6" class="icons-example">
            <span class="fa-stack fa-lg">
              <i class="fa fa-square-o fa-stack-2x"></i>
              <i class="fa fa-twitter fa-stack-1x"></i>
            </span>
            fa-twitter on fa-square-o<br>
            <span class="fa-stack fa-lg">
              <i class="fa fa-circle fa-stack-2x"></i>
              <i class="fa fa-flag fa-stack-1x fa-inverse"></i>
            </span>
            fa-flag on fa-circle<br>
            <span class="fa-stack fa-lg">
              <i class="fa fa-square fa-stack-2x"></i>
              <i class="fa fa-terminal fa-stack-1x fa-inverse"></i>
            </span>
            fa-terminal on fa-square<br>
            <span class="fa-stack fa-lg">
              <i class="fa fa-camera fa-stack-1x"></i>
              <i class="fa fa-ban fa-stack-2x text-danger"></i>
            </span>
            fa-ban on fa-camera
          </div>
          <div span="18" class="icons-code">
            <div>
              <pre><code class="html"><span class="nt">&lt;span</span> <span class="na">class=</span><span class="s">"fa-stack fa-lg"</span><span class="nt">&gt;</span>
  <span class="nt">&lt;i</span> <span class="na">class=</span><span class="s">"fa fa-square-o fa-stack-2x"</span><span class="nt">&gt;&lt;/i&gt;</span>
  <span class="nt">&lt;i</span> <span class="na">class=</span><span class="s">"fa fa-twitter fa-stack-1x"</span><span class="nt">&gt;&lt;/i&gt;</span>
<span class="nt">&lt;/span&gt;</span>
fa-twitter on fa-square-o<span class="nt">&lt;br&gt;</span>
<span class="nt">&lt;span</span> <span class="na">class=</span><span class="s">"fa-stack fa-lg"</span><span class="nt">&gt;</span>
  <span class="nt">&lt;i</span> <span class="na">class=</span><span class="s">"fa fa-circle fa-stack-2x"</span><span class="nt">&gt;&lt;/i&gt;</span>
  <span class="nt">&lt;i</span> <span class="na">class=</span><span class="s">"fa fa-flag fa-stack-1x fa-inverse"</span><span class="nt">&gt;&lt;/i&gt;</span>
<span class="nt">&lt;/span&gt;</span>
fa-flag on fa-circle<span class="nt">&lt;br&gt;</span>
<span class="nt">&lt;span</span> <span class="na">class=</span><span class="s">"fa-stack fa-lg"</span><span class="nt">&gt;</span>
  <span class="nt">&lt;i</span> <span class="na">class=</span><span class="s">"fa fa-square fa-stack-2x"</span><span class="nt">&gt;&lt;/i&gt;</span>
  <span class="nt">&lt;i</span> <span class="na">class=</span><span class="s">"fa fa-terminal fa-stack-1x fa-inverse"</span><span class="nt">&gt;&lt;/i&gt;</span>
<span class="nt">&lt;/span&gt;</span>
fa-terminal on fa-square<span class="nt">&lt;br&gt;</span>
<span class="nt">&lt;span</span> <span class="na">class=</span><span class="s">"fa-stack fa-lg"</span><span class="nt">&gt;</span>
  <span class="nt">&lt;i</span> <span class="na">class=</span><span class="s">"fa fa-camera fa-stack-1x"</span><span class="nt">&gt;&lt;/i&gt;</span>
  <span class="nt">&lt;i</span> <span class="na">class=</span><span class="s">"fa fa-ban fa-stack-2x text-danger"</span><span class="nt">&gt;&lt;/i&gt;</span>
<span class="nt">&lt;/span&gt;</span>
fa-ban on fa-camera
</code></pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconsData from './icons-data'
export default {
  data () {
    return {
      tab: 'icons',
      icons: IconsData.icons,
      iconTypes: {
        WebApplicationIcons: 'Web Application Icons',
        AccessibilityIcons: 'Accessibility Icons',
        HandIcons: 'Hand Icons',
        TransportationIcons: 'Transportation Icons',
        GenderIcons: 'Gender Icons',
        FileTypeIcons: 'File Type Icons',
        SpinnerIcons: 'Spinner Icons',
        FormControlIcons: 'Form Control Icons',
        PaymentIcons: 'Payment Icons',
        ChartIcons: 'Chart Icons',
        CurrencyIcons: 'Currency Icons',
        TextEditorIcons: 'Text Editor Icons',
        DirectionalIcons: 'Directional Icons',
        VideoPlayerIcons: 'Video Player Icons',
        BrandIcons: 'Brand Icons',
        MedicalIcons: 'Medical Icons'
      }
    }
  },
  methods: {
    filterIcons (type) {
      return this.icons.filter(icon => {
        return icon.categories.some(categorie => categorie === type)
      })
    },
    iconAliases (icon) {
      if (icon.aliases) {
        return '(' + icon.aliases.join(', ') + ')'
      } else {
        return ''
      }
    }
  }
}
</script>
<style scoped>
@import './code.css';
.icons-container {
  background: white;
  padding: 24px;
}
.icons-container .tabs {
  text-align: left;
  height: 40px;
  padding: 0px 10px;
}
.icons-container .tabpage {
  float: left;
  line-height: 40px;
  padding: 0px 10px;
  cursor: pointer;
}
.icons-container .tabpage:hover {
  color: blue
}
.icons-container .selected {
  background: #dddee1;
}
.icons-container .icons-section {
  padding: 10px;
  text-align: left;
}
.icons-container h2 {
  padding: 10px 0px;
  border-bottom: 1px solid #dddee1;
}
.icons-container .icons-all {
  text-align: left;
}
.icons-container .icons-item {
  display: inline-block;
  text-align: left;
  width: 20%;
  padding: 5px 0px;
  font-size: 14px;
}
.icons-container .icons-content {
  position: relative;
}
.icons-container .icons-example {
  width: 20%;
  display: inline-block;
  position: relative;
  left: 10px;
  top: 10px;
  vertical-align: top;
}
.icons-container .icons-code {
  vertical-align: top;
  display: inline-block;
  text-align: left;
  width: 79%;
}
.text-danger {
  color: #d9534f;
}
</style>
