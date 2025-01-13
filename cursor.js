const img = document.getElementById("cursor");

document.addEventListener("mousemove", (event) => {
  const mouseX = event.pageX;
  const mouseY = event.pageY;
  
  img.style.left = mouseX + "px";
  img.style.top = mouseY + "px";
});
