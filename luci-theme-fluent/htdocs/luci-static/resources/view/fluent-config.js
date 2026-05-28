'use strict';
'require form';
'require uci';
'require view';

var trans_set = [0, 0.1, 0.2, 0.3, 0.4,
	0.5, 0.6, 0.7, 0.8, 0.9, 1 ];

function createColorPicker(textInput) {
	const colorPicker = document.createElement('input');
	colorPicker.type = 'color';
	colorPicker.value = textInput.value;
	colorPicker.style.width = '24px';
	colorPicker.style.height = '24px';
	colorPicker.style.padding = '0px';
	colorPicker.style.marginLeft = '5px';
	colorPicker.style.borderRadius = '4px';
	colorPicker.style.border = '1px solid #d9d9d9';
	textInput.parentNode.insertBefore(colorPicker, textInput.nextSibling);
	colorPicker.addEventListener('input', function() {
		textInput.value = colorPicker.value;
	});
	textInput.addEventListener('input', function() {
		colorPicker.value = textInput.value;
	});
}

return view.extend({
	load: function() {
		return uci.load('fluent');
	},

	render: function(data) {
		var m, s, o;

		m = new form.Map('fluent', _('Fluent theme configuration'),
			_('Here you can set the primary color, theme mode, font weight, blur and transparency of the Fluent theme.'));

		s = m.section(form.TypedSection, 'global', _('Theme configuration'));
		s.addremove = false;
		s.anonymous = true;

		o = s.option(form.ListValue, 'mode', _('Theme mode'));
		o.value('normal', _('Follow system'));
		o.value('light', _('Light mode'));
		o.value('dark', _('Dark mode'));
		o.default = 'normal';
		o.rmempty = false;

		o = s.option(form.ListValue, 'font_weight', _('Font'));
		o.value('normal', _('Normal'));
		o.value('600', _('Semibold'));
		o.default = '600';
		o.rmempty = false;

		o = s.option(form.Value, 'primary', _('[Light mode] Primary Color'), _('A HEX color (default: #0078d4).'))
		o.default = '#0078d4';
		o.rmempty = false;
		o.validate = function(section_id, value) {
			if (section_id)
				return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(value) ||
					_('Expecting: %s').format(_('valid HEX color value'));
			return true;
		};
		o.render = function(section_id, option_index, cfgvalue) {
			var el = form.Value.prototype.render.apply(this, arguments);
			setTimeout(function() {
				const textInput = document.querySelector('[id^="widget.cbid.fluent."][id$=".primary"]');
				createColorPicker(textInput);
			}, 0);
			return el;
		};

		o = s.option(form.ListValue, 'transparency', _('[Light mode] Transparency'),
			_('0 transparent - 1 opaque (suggest: transparent: 0 or translucent preset: 0.5).'));
		for (var i of trans_set)
			o.value(i);
		o.default = '0.5';
		o.rmempty = false;

		o = s.option(form.Value, 'blur', _('[Light mode] Frosted Glass Radius'),
			_('Larger value will more blurred (suggest: clear: 0 or blur preset: 10).'));
		o.datatype = 'ufloat';
		o.default = '0';
		o.rmempty = false;

		o = s.option(form.Value, 'progressbar_font', _('[Light mode] Progress bar Font Color'), _('A HEX color (default: #2e2b60).'))
		o.default = '#2e2b60';
		o.rmempty = false;
		o.validate = function(section_id, value) {
			if (section_id)
				return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(value) ||
					_('Expecting: %s').format(_('valid HEX color value'));
			return true;
		};
		o.render = function(section_id, option_index, cfgvalue) {
			var el = form.Value.prototype.render.apply(this, arguments);
			setTimeout(function() {
				const textInput = document.querySelector('[id^="widget.cbid.fluent."][id$=".progressbar_font"]');
				createColorPicker(textInput);
			}, 0);
			return el;
		};

		o = s.option(form.Value, 'dark_primary', _('[Dark mode] Primary Color'),
			_('A HEX Color (default: #1a1a2e).'))
		o.default = '#1a1a2e';
		o.rmempty = false;
		o.validate = function(section_id, value) {
			if (section_id)
				return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(value) ||
					_('Expecting: %s').format(_('valid HEX color value'));
			return true;
		};
		o.render = function(section_id, option_index, cfgvalue) {
			var el = form.Value.prototype.render.apply(this, arguments);
			setTimeout(function() {
				const textInput = document.querySelector('[id^="widget.cbid.fluent."][id$=".dark_primary"]');
				createColorPicker(textInput);
			}, 0);
			return el;
		};

		o = s.option(form.ListValue, 'transparency_dark', _('[Dark mode] Transparency'),
			_('0 transparent - 1 opaque (suggest: black translucent preset: 0.5).'));
		for (var i of trans_set)
			o.value(i);
		o.default = '0.5';
		o.rmempty = false;

		o = s.option(form.Value, 'blur_dark', _('[Dark mode] Frosted Glass Radius'),
			_('Larger value will more blurred (suggest: clear: 0 or blur preset: 10).'))
		o.datatype = 'ufloat';
		o.default = '0';
		o.rmempty = false;

		o = s.option(form.Button, '_save', _('Save settings'));
		o.inputstyle = 'apply';
		o.inputtitle = _('Save current settings');
		o.onclick = function() {
			ui.changes.apply(true);
			return this.map.save(null, true);
		}

		return m.render();
	},

	handleSaveApply: null,
	handleSave: null,
	handleReset: null
});
