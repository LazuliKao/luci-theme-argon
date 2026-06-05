'use strict';
'require form';
'require fs';
'require rpc';
'require uci';
'require ui';
'require view';

var callAvailSpace = rpc.declare({
	object: 'luci.fluent',
	method: 'avail'
});

var callRemoveFluent = rpc.declare({
	object: 'luci.fluent',
	method: 'remove',
	params: ['filename'],
	expect: { '': {} }
});

var callRenameFluent = rpc.declare({
	object: 'luci.fluent',
	method: 'rename',
	params: ['newname'],
	expect: { '': {} }
});

var bg_path = '/www/luci-static/fluent/background/';

function createColorPicker(textInput) {
	const colorPicker = document.createElement('input');
	colorPicker.type = 'color';
	colorPicker.value = textInput.value;
	colorPicker.style.width = '32px';
	colorPicker.style.height = '32px';
	colorPicker.style.padding = '2px';
	colorPicker.style.marginLeft = '8px';
	colorPicker.style.borderRadius = '4px';
	colorPicker.style.border = '1px solid var(--fluent-border)';
	colorPicker.style.cursor = 'pointer';
	colorPicker.style.verticalAlign = 'middle';
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
		return Promise.all([
			uci.load('fluent'),
			L.resolveDefault(callAvailSpace(), {}),
			L.resolveDefault(fs.list(bg_path), {})
		]);
	},

	render: function(data) {
		var m, s, o;

		m = new form.Map('fluent', _('Fluent Theme Configuration'),
			_('Customize the FluentUI theme appearance. Changes will be applied to the LuCI interface.'));

		// ============================================================
		// SECTION 1: Theme Mode
		// ============================================================
		s = m.section(form.TypedSection, 'global', _('Theme Mode'));
		s.addremove = false;
		s.anonymous = true;

		o = s.option(form.ListValue, 'mode', _('Theme Mode'),
			_('Select the theme color mode. "Follow system" will automatically switch based on your OS settings.'));
		o.value('normal', _('Follow system'));
		o.value('light', _('Light mode'));
		o.value('dark', _('Dark mode'));
		o.default = 'normal';
		o.rmempty = false;

		// ============================================================
		// SECTION 2: Colors
		// ============================================================
		s = m.section(form.TypedSection, 'global', _('Colors'));
		s.addremove = false;
		s.anonymous = true;

		o = s.option(form.Value, 'primary', _('Primary Color (Light)'),
			_('The main accent color used in light mode. Default: #0078D4 (Fluent Blue)'));
		o.default = '#0078D4';
		o.rmempty = false;
		o.validate = function(section_id, value) {
			if (section_id)
				return /(^#[0-9A-Fa-f]{6}$)|(^#[0-9A-Fa-f]{3}$)/i.test(value) ||
					_('Expecting: %s').format(_('valid HEX color value'));
			return true;
		};
		o.render = function(section_id, option_index, cfgvalue) {
			var el = form.Value.prototype.render.apply(this, arguments);
			setTimeout(function() {
				const textInput = document.querySelector('[id^="widget.cbid.fluent."][id$=".primary"]');
				if (textInput) createColorPicker(textInput);
			}, 0);
			return el;
		};

		o = s.option(form.Value, 'dark_primary', _('Primary Color (Dark)'),
			_('The main accent color used in dark mode. Default: #4DA6FF (Brand tint20)'));
		o.default = '#4DA6FF';
		o.rmempty = false;
		o.validate = function(section_id, value) {
			if (section_id)
				return /(^#[0-9A-Fa-f]{6}$)|(^#[0-9A-Fa-f]{3}$)/i.test(value) ||
					_('Expecting: %s').format(_('valid HEX color value'));
			return true;
		};
		o.render = function(section_id, option_index, cfgvalue) {
			var el = form.Value.prototype.render.apply(this, arguments);
			setTimeout(function() {
				const textInput = document.querySelector('[id^="widget.cbid.fluent."][id$=".dark_primary"]');
				if (textInput) createColorPicker(textInput);
			}, 0);
			return el;
		};

		// ============================================================
		// SECTION 3: Typography
		// ============================================================
		s = m.section(form.TypedSection, 'global', _('Typography'));
		s.addremove = false;
		s.anonymous = true;

		o = s.option(form.ListValue, 'font_weight', _('Font Weight'),
			_('Controls the weight (boldness) of text throughout the interface.'));
		o.value('300', _('Light'));
		o.value('400', _('Regular'));
		o.value('500', _('Medium'));
		o.value('600', _('Semibold'));
		o.value('700', _('Bold'));
		o.default = '400';
		o.rmempty = false;

		o = s.option(form.ListValue, 'font_size', _('Base Font Size'),
			=_('The base font size for the interface. Larger values make text more readable.'));
		o.value('12', _('Small (12px)'));
		o.value('13', _('Compact (13px)'));
		o.value('14', _('Normal (14px)'));
		o.value('15', _('Medium (15px)'));
		o.value('16', _('Large (16px)'));
		o.default = '14';
		o.rmempty = false;

		// ============================================================
		// SECTION 4: Layout
		// ============================================================
		s = m.section(form.TypedSection, 'global', _('Layout'));
		s.addremove = false;
		s.anonymous = true;

		o = s.option(form.ListValue, 'sidebar_width', _('Sidebar Width'),
			_('The width of the navigation sidebar. Default: 260px'));
		o.value('220', _('Narrow (220px)'));
		o.value('240', _('Compact (240px)'));
		o.value('260', _('Normal (260px)'));
		o.value('280', _('Wide (280px)'));
		o.value('300', _('Extra Wide (300px)'));
		o.default = '260';
		o.rmempty = false;

		o = s.option(form.ListValue, 'sidebar_style', _('Sidebar Style'),
			_('Controls the visual style of the sidebar navigation.'));
		o.value('default', _('Default'));
		o.value('compact', _('Compact'));
		o.value('expanded', _('Expanded'));
		o.default = 'default';
		o.rmempty = false;

		o = s.option(form.ListValue, 'header_height', _('Header Height'),
			_('The height of the top header bar. Default: 48px'));
		o.value('40', _('Compact (40px)'));
		o.value('44', _('Medium (44px)'));
		o.value('48', _('Normal (48px)'));
		o.value('52', _('Tall (52px)'));
		o.value('56', _('Extra Tall (56px)'));
		o.default = '48';
		o.rmempty = false;

		o = s.option(form.ListValue, 'border_radius', _('Border Radius'),
			_('Controls the roundness of corners throughout the interface.'));
		o.value('2', _('Sharp (2px)'));
		o.value('4', _('Subtle (4px)'));
		o.value('6', _('Medium (6px)'));
		o.value('8', _('Rounded (8px)'));
		o.value('12', _('Extra Rounded (12px)'));
		o.default = '4';
		o.rmempty = false;

		o = s.option(form.ListValue, 'control_height', _('Control Height'),
			_('The height of input fields, buttons, and dropdown menus.'));
		o.value('32', _('Compact (32px)'));
		o.value('42', _('Default (42px)'));
		o.default = '32';
		o.rmempty = false;

		// ============================================================
		// SECTION 5: Cards & Surfaces
		// ============================================================
		s = m.section(form.TypedSection, 'global', _('Cards & Surfaces'));
		s.addremove = false;
		s.anonymous = true;

		o = s.option(form.ListValue, 'card_shadow', _('Card Shadow'),
			_('The shadow depth of card components. Higher values create more elevation.'));
		o.value('none', _('None'));
		o.value('small', _('Small'));
		o.value('medium', _('Medium'));
		o.value('large', _('Large'));
		o.default = 'small';
		o.rmempty = false;

		o = s.option(form.ListValue, 'card_border', _('Card Border'),
			=_('Whether to show borders around card components.'));
		o.value('1', _('Show border'));
		o.value('0', _('No border (shadow only)'));
		o.default = '1';
		o.rmempty = false;

		// ============================================================
		// SECTION 6: Animations
		// ============================================================
		s = m.section(form.TypedSection, 'global', _('Animations'));
		s.addremove = false;
		s.anonymous = true;

		o = s.option(form.ListValue, 'transition_speed', _('Transition Speed'),
			_('Controls the speed of animations and transitions throughout the interface.'));
		o.value('fast', _('Fast (100ms)'));
		o.value('normal', _('Normal (150ms)'));
		o.value('slow', _('Slow (250ms)'));
		o.value('none', _('Disabled'));
		o.default = 'normal';
		o.rmempty = false;

		// ============================================================
		// SECTION 7: Login Page
		// ============================================================
		s = m.section(form.TypedSection, 'global', _('Login Page'));
		s.addremove = false;
		s.anonymous = true;

		o = s.option(form.ListValue, 'login_bg', _('Background Source'),
			_('Choose the background image source for the login page.'));
		o.value('builtin', _('Built-in'));
		o.value('microsoft', _('Microsoft Dynamic (Code Generated)'));
		o.value('custom', _('Custom upload'));
		o.value('bing', _('Bing Daily'));
		o.value('unsplash', _('Unsplash Random'));
		o.default = 'builtin';
		o.rmempty = false;

		o = s.option(form.Value, 'login_blur', _('Blur Intensity'),
			_('The blur intensity of the login card background. 0 = no blur, 40 = heavy blur. Default: 40'));
		o.datatype = 'uinteger';
		o.default = '40';
		o.rmempty = false;

		o = s.option(form.ListValue, 'login_transparency', _('Card Transparency'),
			_('The transparency of the login card. 0 = fully transparent, 1 = fully opaque.'));
		o.value('0.70', _('Very Transparent (70%)'));
		o.value('0.80', _('Transparent (80%)'));
		o.value('0.85', _('Slightly Transparent (85%)'));
		o.value('0.88', _('Semi-Transparent (88%)'));
		o.value('0.90', _('Mostly Opaque (90%)'));
		o.value('0.92', _('Default (92%)'));
		o.value('0.95', _('Slightly Opaque (95%)'));
		o.value('1.00', _('Fully Opaque (100%)'));
		o.default = '0.92';
		o.rmempty = false;

		o = s.option(form.ListValue, 'login_animation', _('Login Animation'),
			(_('Whether to show the fade-in animation on the login page.')));
		o.value('1', _('Enabled'));
		o.value('0', _('Disabled'));
		o.default = '1';
		o.rmempty = false;

		// ============================================================
		// SECTION 8: Advanced
		// ============================================================
		s = m.section(form.TypedSection, 'global', _('Advanced'));
		s.addremove = false;
		s.anonymous = true;

		o = s.option(form.Value, 'custom_css', _('Custom CSS'),
			_('Add custom CSS to override theme styles. Use with caution.'));
		o.datatype = 'string';
		o.rmempty = true;
		o.placeholder = _('Enter custom CSS...');

		o = s.option(form.Value, 'dark_sidebar_bg', _('Dark Sidebar Background'),
			_('Override the dark mode sidebar background color. Leave empty for default.'));
		o.default = '';
		o.rmempty = true;
		o.validate = function(section_id, value) {
			if (!value) return true;
			if (section_id)
				return /(^#[0-9A-Fa-f]{6}$)|(^#[0-9A-Fa-f]{3}$)/i.test(value) ||
					_('Expecting: %s').format(_('valid HEX color value'));
			return true;
		};
		o.render = function(section_id, option_index, cfgvalue) {
			var el = form.Value.prototype.render.apply(this, arguments);
			setTimeout(function() {
				const textInput = document.querySelector('[id^="widget.cbid.fluent."][id$=".dark_sidebar_bg"]');
				if (textInput) createColorPicker(textInput);
			}, 0);
			return el;
		};

		o = s.option(form.Value, 'dark_card_bg', _('Dark Card Background'),
			_('Override the dark mode card background color. Leave empty for default.'));
		o.default = '';
		o.rmempty = true;
		o.validate = function(section_id, value) {
			if (!value) return true;
			if (section_id)
				return /(^#[0-9A-Fa-f]{6}$)|(^#[0-9A-Fa-f]{3}$)/i.test(value) ||
					_('Expecting: %s').format(_('valid HEX color value'));
			return true;
		};
		o.render = function(section_id, option_index, cfgvalue) {
			var el = form.Value.prototype.render.apply(this, arguments);
			setTimeout(function() {
				const textInput = document.querySelector('[id^="widget.cbid.fluent."][id$=".dark_card_bg"]');
				if (textInput) createColorPicker(textInput);
			}, 0);
			return el;
		};

		o = s.option(form.Value, 'dark_page_bg', _('Dark Page Background'),
			_('Override the dark mode page background color. Leave empty for default.'));
		o.default = '';
		o.rmempty = true;
		o.validate = function(section_id, value) {
			if (!value) return true;
			if (section_id)
				return /(^#[0-9A-Fa-f]{6}$)|(^#[0-9A-Fa-f]{3}$)/i.test(value) ||
					_('Expecting: %s').format(_('valid HEX color value'));
			return true;
		};
		o.render = function(section_id, option_index, cfgvalue) {
			var el = form.Value.prototype.render.apply(this, arguments);
			setTimeout(function() {
				const textInput = document.querySelector('[id^="widget.cbid.fluent."][id$=".dark_page_bg"]');
				if (textInput) createColorPicker(textInput);
			}, 0);
			return el;
		};

		// ============================================================
		// Save Button
		// ============================================================
		o = s.option(form.Button, '_save', _('Save Settings'));
		o.inputstyle = 'apply';
		o.inputtitle = _('Save current settings');
		o.onclick = function() {
			ui.changes.apply(true);
			return this.map.save(null, true);
		};

		// ============================================================
		// SECTION 9: Background Management
		// ============================================================
		s = m.section(form.TypedSection, null, _('Upload Background'),
			_('Available space: %1024.2mB').format(data[1].avail * 1024),
			_('Upload custom background images for the login page. Supported formats: jpg, png, gif, webp, mp4, webm.'));
		s.addremove = false;
		s.anonymous = true;

		o = s.option(form.Button, '_upload_bg', _('Upload Background'),
			_('Files will be uploaded to <code>%s</code>.').format(bg_path));
		o.inputstyle = 'action';
		o.inputtitle = _('Upload...');
		o.onclick = function(ev, section_id) {
			var file = '/tmp/fluent_background.tmp';
			return ui.uploadFile(file, ev.target).then(function(res) {
				return L.resolveDefault(callRenameFluent(res.name), {}).then(function(ret) {
					if (ret.result === 0)
						return location.reload();
					else {
						ui.addNotification(null, E('p', _('Failed to upload file: %s.').format(res.name)));
						return L.resolveDefault(fs.remove(file), {});
					}
				});
			})
			.catch(function(e) { ui.addNotification(null, E('p', e.message)); });
		};
		o.modalonly = true;

		// ============================================================
		// Background File List
		// ============================================================
		s = m.section(form.TableSection);
		s.render = function() {
			var tbl = E('table', { 'class': 'table cbi-section-table' },
				E('tr', { 'class': 'tr table-titles' }, [
					E('th', { 'class': 'th' }, [ _('Filename') ]),
					E('th', { 'class': 'th' }, [ _('Modified date') ]),
					E('th', { 'class': 'th' }, [ _('Size') ]),
					E('th', { 'class': 'th' }, [ _('Action') ])
				])
			);

			cbi_update_table(tbl, data[2].map(L.bind(function(file) {
				return [
					file.name,
					new Date(file.mtime * 1000).toLocaleString(),
					String.format('%1024.2mB', file.size),
					E('button', {
						'class': 'btn cbi-button cbi-button-remove',
						'click': ui.createHandlerFn(this, function() {
							return L.resolveDefault(callRemoveFluent(file.name), {})
							.then(function() { return location.reload(); });
						})
					}, [ _('Delete') ])
				];
			}, this)), E('em', _('No files found.')));

			return E('div', { 'class': 'cbi-map', 'id': 'cbi-filelist' }, [
				E('h3', _('Background File List')),
				tbl
			]);
		};

		return m.render();
	},

	handleSaveApply: null,
	handleSave: null,
	handleReset: null
});
