

所有关键属性都使用 !important 强制覆盖 cascade.css 中的样式
需要在fluent-dark添加对应样式的暗色模式版本（注意实际加载时是先加载fluent.css，再加载fluent-dark.css覆盖）

优化复选框样式，将其改成 Fluent UI 的 switch 样式，并添加动画效果，可参考
https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-switch/library/src/components/Switch/useSwitchStyles.styles.ts



对于在table等特殊场景里面的checkbox还是用勾选框样式，参考
https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-checkbox/library/src/components/Checkbox/useCheckboxStyles.styles.ts


优化文本输入、文本域的样式，参考
https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-input/library/src/components/Input/useInputStyles.styles.ts
https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-textarea/library/src/components/Textarea/useTextareaStyles.styles.ts


这是一个下拉框示例的HTML结构，可以参考这个结构来编写CSS样式，注意这个下拉框是可以输入自定义内容的，并且有动画效果，参考样式
https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-combobox/library/src/components/Dropdown/useDropdownStyles.styles.ts
https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-combobox/library/src/components/Combobox/useComboboxStyles.styles.ts
https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-combobox/library/src/components/Listbox/useListboxStyles.styles.ts
https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-combobox/library/src/components/Option/useOptionStyles.styles.ts
https://github.com/microsoft/fluentui/blob/master/packages/react-components/react-combobox/library/src/components/OptionGroup/useOptionGroupStyles.styles.ts
``` html
<div id="cbid.passwall2.cfg0c3fd6.remote_dns" class="cbi-dropdown focus" optional="" tabindex="0" data-idref="467f079e" data-changed="true" open="">
    <ul tabindex="-1" class="dropdown" style="max-height: 413.99px; bottom: 39.9167px;">
        <li placeholder="" tabindex="0">-- Please choose --</li>
        <li data-value="1.1.1.1" tabindex="0">1.1.1.1 (CloudFlare)</li>
        <li data-value="1.1.1.2" tabindex="0">1.1.1.2 (CloudFlare-Security)</li>
        <li data-value="8.8.4.4" tabindex="0">8.8.4.4 (Google)</li>
        <li data-value="8.8.8.8" tabindex="0">8.8.8.8 (Google)</li>
        <li data-value="9.9.9.9" tabindex="0">9.9.9.9 (Quad9-Recommended)</li>
        <li data-value="149.112.112.112" tabindex="0">149.112.112.112 (Quad9-Recommended)</li>
        <li data-value="208.67.220.220" tabindex="0">208.67.220.220 (OpenDNS)</li>
        <li data-value="208.67.222.222" class="" tabindex="0">208.67.222.222 (OpenDNS)</li>
        <li data-value="127.0.0.1:5336" class="" display="0" selected="" tabindex="0">127.0.0.1:5336</li>
        <li data-value="-" unselectable=""><input type="text" class="create-item-input" placeholder="-- custom --" inputmode="text" enterkeyhint="done"></li>
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
        <li data-value="127.0.0.1:5336" class="" display="0" selected="">127.0.0.1:5336</li>
        <li data-value="-" unselectable=""><input type="text" class="create-item-input" placeholder="-- custom --" inputmode="text" enterkeyhint="done"></li>
    </ul><span class="more" tabindex="-1">···</span><span class="open" tabindex="-1">▾</span>
    <div tabindex="0"><input type="hidden" name="cbid.passwall2.cfg0c3fd6.remote_dns" value="127.0.0.1:5336"></div>
</div>
```