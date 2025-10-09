所有关键属性都使用 !important 强制覆盖 cascade.css 中的样式
需要在 fluent-dark 添加对应样式的暗色模式版本（注意实际加载时是先加载 fluent.css，再加载 fluent-dark.css 覆盖）

优化复选框样式，将其改成 Fluent UI 的 switch 样式，并添加动画效果，可参考
https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-switch/library/src/components/Switch/useSwitchStyles.styles.ts

对于在 table 等特殊场景里面的 checkbox 还是用勾选框样式，参考
https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-checkbox/library/src/components/Checkbox/useCheckboxStyles.styles.ts

优化文本输入、文本域的样式，参考
https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-input/library/src/components/Input/useInputStyles.styles.ts
https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-textarea/library/src/components/Textarea/useTextareaStyles.styles.ts

这是一个下拉框示例的 HTML 结构，可以参考这个结构来编写 CSS 样式，注意这个下拉框是可以输入自定义内容的，并且有动画效果，参考样式
https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-combobox/library/src/components/Dropdown/useDropdownStyles.styles.ts
https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-combobox/library/src/components/Combobox/useComboboxStyles.styles.ts
https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-combobox/library/src/components/Listbox/useListboxStyles.styles.ts
https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-combobox/library/src/components/Option/useOptionStyles.styles.ts
https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-combobox/library/src/components/OptionGroup/useOptionGroupStyles.styles.ts

```html
<div
  id="cbid.passwall2.cfg0c3fd6.remote_dns"
  class="cbi-dropdown focus"
  optional=""
  tabindex="0"
  data-idref="467f079e"
  data-changed="true"
  open=""
>
  <ul
    tabindex="-1"
    class="dropdown"
    style="max-height: 413.99px; bottom: 39.9167px;"
  >
    <li placeholder="" tabindex="0">-- Please choose --</li>
    <li data-value="1.1.1.1" tabindex="0">1.1.1.1 (CloudFlare)</li>
    <li data-value="1.1.1.2" tabindex="0">1.1.1.2 (CloudFlare-Security)</li>
    <li data-value="8.8.4.4" tabindex="0">8.8.4.4 (Google)</li>
    <li data-value="8.8.8.8" tabindex="0">8.8.8.8 (Google)</li>
    <li data-value="9.9.9.9" tabindex="0">9.9.9.9 (Quad9-Recommended)</li>
    <li data-value="149.112.112.112" tabindex="0">
      149.112.112.112 (Quad9-Recommended)
    </li>
    <li data-value="208.67.220.220" tabindex="0">208.67.220.220 (OpenDNS)</li>
    <li data-value="208.67.222.222" class="" tabindex="0">
      208.67.222.222 (OpenDNS)
    </li>
    <li
      data-value="127.0.0.1:5336"
      class=""
      display="0"
      selected=""
      tabindex="0"
    >
      127.0.0.1:5336
    </li>
    <li data-value="-" unselectable="">
      <input
        type="text"
        class="create-item-input"
        placeholder="-- custom --"
        inputmode="text"
        enterkeyhint="done"
      />
    </li>
  </ul>
  <ul tabindex="-1" class="preview" style="">
    <li placeholder="">-- Please choose --</li>
    <li data-value="1.1.1.1">1.1.1.1 (CloudFlare)</li>
    <li data-value="1.1.1.2">1.1.1.2 (CloudFlare-Security)</li>
    <li data-value="8.8.4.4">8.8.4.4 (Google)</li>
    <li data-value="8.8.8.8">8.8.8.8 (Google)</li>
    <li data-value="9.9.9.9">9.9.9.9 (Quad9-Recommended)</li>
    <li data-value="149.112.112.112">149.112.112.112 (Quad9-Recommended)</li>
    <li data-value="208.67.220.220">208.67.220.220 (OpenDNS)</li>
    <li data-value="208.67.222.222" class="">208.67.222.222 (OpenDNS)</li>
    <li data-value="127.0.0.1:5336" class="" display="0" selected="">
      127.0.0.1:5336
    </li>
    <li data-value="-" unselectable="">
      <input
        type="text"
        class="create-item-input"
        placeholder="-- custom --"
        inputmode="text"
        enterkeyhint="done"
      />
    </li>
  </ul>
  <span class="more" tabindex="-1">···</span
  ><span class="open" tabindex="-1">▾</span>
  <div tabindex="0">
    <input
      type="hidden"
      name="cbid.passwall2.cfg0c3fd6.remote_dns"
      value="127.0.0.1:5336"
    />
  </div>
</div>
```

优化分组的 Tab
参考
https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-tabs/library/src/components/Tab/useTabStyles.styles.ts
https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-tabs/library/src/components/TabList/useTabListStyles.styles.ts

结构：
 （通常位于标题下方，为横向的 tab）
```html
<ul class="cbi-tabmenu">
  <li class="cbi-tab" data-tab="general"><a href="#">常规设置</a></li>
  <li class="cbi-tab-disabled" data-tab="logging"><a href="#">日志记录</a></li>
  <li class="cbi-tab-disabled" data-tab="timesync"><a href="#">时间同步</a></li>
  <li class="cbi-tab-disabled" data-tab="language">
    <a href="#">语言和界面</a>
  </li>
  <li class="cbi-tab-disabled" data-tab="zram"><a href="#">ZRam 设置</a></li>
</ul>
```

或者：
 （通常为卡片顶部）
```html
<div id="tabmenu" style="">
  <ul class="tabs">
    <li class="tabmenu-item-syslog ">
      <a href="/cgi-bin/luci/admin/status/logs/syslog">系统日志</a>
    </li>
    <li class="tabmenu-item-dmesg  active">
      <a href="/cgi-bin/luci/admin/status/logs/dmesg">内核日志</a>
    </li>
  </ul>
</div>
```





请重写并实现FluentUI的button样式，参考
https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-button/library/src/components/Button/useButtonStyles.styles.ts
https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-button/library/src/components/SplitButton/useSplitButtonStyles.styles.ts
https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-button/library/src/components/MenuButton/useMenuButtonStyles.styles.ts