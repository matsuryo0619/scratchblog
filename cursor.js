const img = document.getElementByID("cursor");

document.addEventListener("mousemove", (event) => {
  const mouseX = event.pageX;
  const mouseY = event.pageY;
  
  img.style.left = mouseX + "px";
  img.style.top = mouseY + "px";
});
