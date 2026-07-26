# Calculator

Browser based emulator for Texas Instruments TI-2500 Calculator


Usage
- https://ahmadziadev.github.io/calc/
- Click the on-screen buttons or use the keyboard to operate.

Keyboard mappings
- Digits: `0`–`9`
- Decimal: `.`
- Add/Subtract/Multiply/Divide: `+` `-` `*` `/`
- Percent: `%`
- Equals: `Enter` or `=`
- Clear (C): `Escape` or `Clear`
- Clear Entry (CE): `Backspace` or `Delete`

Notes
- Keyboard input is routed to the existing button click handlers so behavior matches mouse clicks.
- If key presses do not show the button press animation, ensure `style.css` contains the `.keypad button.btn-pressed` rule and `script.js` toggles that class on keydown/keyup.

Credits
- Sound effect by DenielCZ from Pixabay