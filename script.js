const uploadBox = document.querySelector(".upload-box"),
  previewImg = uploadBox.querySelector('img'),
  fileInput = uploadBox.querySelector("input"),
  widthInput = document.querySelector(".width input"),
  heightInput = document.querySelector(".height input"),
  qualityInput = document.querySelector(".quality input"),
  downloadBtn = document.querySelector(".download-btn"),
  ratioInput = document.querySelector(".ratio input");

  let ogImageRatio;

fileInput.addEventListener("change", loadFile);
uploadBox.addEventListener("click", () => fileInput.click());
widthInput.addEventListener('keyup', () => {
    //if checked img ratio stays same 
     const height = ratioInput.checked ? widthInput.value / ogImageRatio : heightInput.value;
     heightInput.value = Math.floor(height)
})
heightInput.addEventListener('keyup', () => {
    //if checked img ratio stays same 
     const width = ratioInput.checked ? heightInput.value * ogImageRatio : widthInput.value;
     widthInput.value = Math.floor(width)
});
downloadBtn.addEventListener('click', resizeAndDownload)


function loadFile(e) {
    const file = e.target.files[0];
    if(!file) return
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener('load', () => { //event fires once image loaded
        widthInput.value= previewImg.naturalWidth
        heightInput.value= previewImg.naturalHeight
        ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
        console.log(ogImageRatio)
        document.querySelector('.wrapper').classList.add('active');
        
    })
}


//down load user modified img or video frame
function resizeAndDownload(){
  const canvas = document.createElement('canvas');
  const a = document.createElement('a');
  const ctx = canvas.getContext('2d')

  const imgQuality = qualityInput.checked ? 0.7 : 1.0;
  
  //canvas size is the input size , input size is the image size
  canvas.width = widthInput.value;
  canvas.height = heightInput.value;

  ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height)
  a.href = canvas.toDataURL('image/jpeg', imgQuality); //pass canvas data Url as a's href
  a.download = new Date().getTime();  // passing current time as download value
  a.click() // auto  click a element to download
}