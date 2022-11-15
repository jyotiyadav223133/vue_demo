<template>
  <div class="home">
      <input type="file" ref="inputFile"/>
      <button type="button" class="btn btn-primary" @click="converFile">Convert Svg to Png</button>
      <img id='img'> 
      <img id='canvas'> 
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  name: 'Home',
  components: {  
  },
  methods:{
    svgUrlToPng(svgUrl, callback) {
        const svgImage = document.createElement('img');
        // imgPreview.style.position = 'absolute';
        // imgPreview.style.top = '-9999px';
        document.body.appendChild(svgImage);
        svgImage.onload = function () {
            const canvas = document.createElement('canvas');
            canvas.width = svgImage.clientWidth;
            canvas.height = svgImage.clientHeight;
            const canvasCtx = canvas.getContext('2d');
            canvasCtx.drawImage(svgImage, 0, 0);
            const imgData = canvas.toDataURL('image/png');
            callback(imgData);
            // document.body.removeChild(imgPreview);
        };
        svgImage.src = svgUrl;
    },
     getSvgUrl(svg) {
        return  URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
    },
     svgToPng(svg, callback) {
        const url = this.getSvgUrl(svg);
        this.svgUrlToPng(url, (imgData) => {
            callback(imgData);
            URL.revokeObjectURL(url);
        });
    },
      converFile(){
          var self = this;
          var imageData = self.$refs.inputFile.files[0];
          console.log(this.$refs.inputFile,"??JYOTI",imageData,"?")
          console.log(this.$refs.inputFile.value,"?JYOTI")
          const svg=self.$refs.inputFile.files[0]
        this.svgToPng(svg,(imgData)=>{
            const pngImage = document.createElement('img');
            document.body.appendChild(pngImage);
            pngImage.src=imgData;
        });

        //   axios.post('http://localhost:4000/convert',{'file':imageData}).then(response=>{
        //       console.log(response,"???")
        //   }).catch((error)=>{
        //       console.log(error)
        //   })
      }
  }
}
</script>
