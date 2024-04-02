document.addEventListener('contextmenu', function (event) {
 event.preventDefault();
  alert("Curieux de connaître ce qui se cache derrière notre espace membre ? Découvre tout cela dans nos formations avancées 😉");
});

// Bloquer les raccourcis clavier
document.addEventListener('keydown', function (event) {
  const isF12 = event.keyCode === 123;
  const macShortcutJ = event.metaKey && event.altKey && event.keyCode === 74; // Cmd + Option + J
  const winLinuxShortcutJ = event.ctrlKey && event.shiftKey && event.keyCode === 74; // Ctrl + Shift + J
  const chromeShortcut = event.ctrlKey && event.shiftKey && event.keyCode === 73; // Ctrl + Shift + I
  const macShortcutC = event.metaKey && event.altKey && event.keyCode === 67; // Cmd + Option + C
  const winLinuxShortcutC = event.ctrlKey && event.altKey && event.keyCode === 67; // Ctrl + Alt + C
  const macNewShortcutC = event.metaKey && event.shiftKey && event.keyCode === 67; // Cmd + Shift + C
  const winLinuxNewShortcutC = event.ctrlKey && event.shiftKey && event.keyCode === 67; // Ctrl + Shift + C
  const macNewShortcutJ = event.metaKey && event.shiftKey && event.keyCode === 74; // Cmd + Shift + J
  const winLinuxNewShortcutJ = event.ctrlKey && event.shiftKey && event.keyCode === 74; // Ctrl + Shift + J

  if (isF12 || macShortcutJ || winLinuxShortcutJ || chromeShortcut || macShortcutC || winLinuxShortcutC || macNewShortcutC || winLinuxNewShortcutC || macNewShortcutJ || winLinuxNewShortcutJ) {
    event.preventDefault();
    alert("Curieux de connaître ce qui se cache derrière notre espace membre ? Découvre tout cela dans nos formations avancées 😉");
  }
});

