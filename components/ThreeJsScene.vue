<template>
  <div class="three-container" ref="threeContainer"></div>

    <nuxt-link v-if="shouldRedirect" to="/nominator">
  </nuxt-link>

</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { PMREMGenerator } from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { Text } from 'troika-three-text'
import { onBeforeUnmount } from 'vue'
import { onBeforeRouteLeave } from 'vue-router';

export default {
  props: {
     scene_type: {
       type: [String],      //260
       required: true
     },
     image: {
      type: [Array],
       required: false
     },
     recepient: {
      type: [Array],
      required: true
     },
     occupation: {
      type: [Array],
      required: false
     },
     description: {
      type: [Array],
      required: true
     }

   }, 
  data() {
    return {
      models: [],
      shouldRedirect: false,
      routeChanged: false
    };
  },
  mounted() {
      this.init();
      const boundMouseHandler = this.onMouseClick.bind(this)
      window.addEventListener('click', boundMouseHandler)
       onBeforeRouteLeave((to, from, next) => {
        // Route is about to change — clean up
        if (this.boundMouseHandler) {
          window.removeEventListener('click', this.boundMouseHandler);
          this.boundMouseHandler = null;
        }
        const route = useRoute()
          watch(
            () => route.fullPath,
            (newPath, oldPath) => {
              console.log("Route changed! -------------------------------------------");
              this.routeChanged = true;
            }
          );

        if (this.routeChanged){
          this.cleanup();

        }
        next(); // allow navigation
      });


  },
  methods: {
    init() { //picks the 3d object.

      const sceneMap = {
        home: () => this.loadhome(),
        roster: () => this.loadRoster(),
        profilepage: () => this.loadProfile()      
      };

      this.ud = "";
      this.wheelHandler = "";
      this.loadedScene = false;
      this.modellimit = 0;
      this.debug = false;
      this.xrotation = 0;
      this.yrotation = 0;
      this.zrotation = 0;
      this.objectsToDispose = [];
      this.scene = new THREE.Scene();
      this.aspectRatio = window.innerWidth / window.innerHeight;

      if (this.scene_type == "home"){
        this.left = -4 * this.aspectRatio
        this.right = 3 * this.aspectRatio
         this.top = 2
        this.bottom = -4
        this.near = 0.9
        this.far = 1000
        this.xcam = -11
        this.ycam = 0
        this.zcam = 1
      }

      if (this.scene_type == "roster"){
        this.left = -6 * this.aspectRatio
        this.right = 4 * this.aspectRatio
        this.top = 4
        this.bottom = -8
        this.near = 0.9
        this.far = 1000
        this.xcam = -1
        this.ycam = 0
        this.zcam = 1
      }

      if (this.scene_type == "profile"){
        this.left = -4 * this.aspectRatio
        this.right = 3 * this.aspectRatio
        this.top = 2
        this.bottom = -4
        this.near = 0.9
        this.far = 1000
        this.xcam = -11
        this.ycam = 0
        this.zcam = 1
      }


      this.camera = new THREE.OrthographicCamera(
        this.left, // left
         this.right,  // right
         this.top,                // top
        this.bottom,               // bottom
         this.near, 
         this.far);              
      this.camera.position.set(this.xcam,this.ycam,this.zcam);
      
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.$refs.threeContainer.appendChild(this.renderer.domElement);
      this.bound = this.renderer.domElement.getBoundingClientRect();
      console.log("yours "+this.bound.left);
      this.renderer.setClearColor(0x2a2a2a);
      // Array to keep track of loaded models 
      this.raycaster = new THREE.Raycaster();
      this.mouse = new THREE.Vector2();

      this.models = [];
      
      this.clickableObjects = [];


      const pmremGenerator = new PMREMGenerator(this.renderer);
      pmremGenerator.compileEquirectangularShader();

      const rgbeLoader = new RGBELoader();
      rgbeLoader.setPath('/hdr/'); // Make sure the path resolves correctly

      rgbeLoader.load('brown_photostudio_02_4k.hdr', (hdrTexture) => {
        const envMap = pmremGenerator.fromEquirectangular(hdrTexture).texture;

        this.scene.environment = envMap; // Enable PBR lighting (for glass)
        this.scene.background = null;    // You can also set = envMap if you want to show the HDRI

        hdrTexture.dispose();
        pmremGenerator.dispose();

        // Now store envMap for use in glass materials
        this.envMap = envMap;
      });


      sceneMap[this.scene_type]?.();
      


      console.log(this.image[0]+" "+this.recepient[0]+" "+this.occupation[0]+" "+this.description[0]);

     
      this.scrollEnabled = false;

        this.$refs.threeContainer.addEventListener('mouseenter', () => {
          this.scrollEnabled = true;
        });

        this.$refs.threeContainer.addEventListener('mouseleave', () => {
          this.scrollEnabled = false;
        });

        

      
      
      const animate = () => {

        while (this.objectsToDispose.length > this.modellimit) {
          const obj = this.objectsToDispose.shift();
          disposeObject(obj);
        }



        this.raycaster.setFromCamera(this.mouse, this.camera)
        const intersects = this.raycaster.intersectObjects(this.scene.children, true)

      /**  if (intersects.length > 0) {
          if (this.hoveredMesh !== intersects[0].object) {
            if (this.hoveredMesh) this.hoveredMesh.material.emissive.set(0x000000)
              this.hoveredMesh = intersects[0].object
            this.hoveredMesh.material.emissive.set(0x444444)
          }
        } else {
          if (this.hoveredMesh) this.hoveredMesh.material.emissive.set(0x000000)
          this.hoveredMesh = null
        }
**/
        requestAnimationFrame(animate);
      
        if (this.models && this.models.length > 0) {
          this.models.forEach((m) => {
            if (m && this.scene_type == "home")
                    { m.rotation.z = this.zrotation;
                    m.rotation.x = this.xrotation;
                    m.rotation.y = this.yrotation;
          }
          if (m && this.scene_type == "roster")
                    { m.rotation.z = this.zrotation;
                    m.rotation.x = this.xrotation;
                    m.rotation.y = this.yrotation;
          }
          });
        }
        
        this.renderer.render(this.scene, this.camera);
      };

      const disposeObject = (obj) => {
          if (!obj) return;
  
          if (obj.geometry) {
              obj.geometry.dispose();
          }
  
          if (obj.material) {
            if (Array.isArray(obj.material)) {
                obj.material.forEach(material => disposeMaterial(material));
            } else {
                disposeMaterial(obj.material);
            }
        }

        if (obj.parent) {
          obj.parent.remove(obj);
        }
  
        if (obj.children) {
          while (obj.children.length > 0) {
            disposeObject(obj.children[0]);
          }
          }
      };

      const disposeMaterial = (material) => {
        if (!material) return;
  
        Object.keys(material).forEach(prop => {
        if (material[prop] && material[prop].isTexture) {
          material[prop].dispose();
        }
      });
  
  // Dispose material
      material.dispose();
      };


      
      animate();
    },
    onMouseClick(event) {
  // Get the bounding rectangle of the container to handle correct mouse position
  if (this.routeChanged){ return};
  const rect = this.renderer.domElement.getBoundingClientRect();
  console.log("bound "+rect.left)
  // Calculate mouse position in normalized device coordinates (-1 to +1)
  // Use the container's coordinates instead of window for more accurate positioning
  this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
 
  // Update the raycaster with the camera and mouse position
  this.raycaster.setFromCamera(this.mouse, this.camera);
  // Check for intersections with all objects first to get the nearest
  const allIntersects = this.raycaster.intersectObjects(this.scene.children, true);
  // Filter to only include our clickable objects
  let intersector = false
  for (let i = 0; i < allIntersects.length; i++){
 
    if (allIntersects[i].object.userData.modelType == "glass"){
      this.ud = allIntersects[i].object.userData
      intersector = true
    }
  }
  const formData = {
    image: this.ud.image,
    recepient: this.ud.recepient,
    occupation: this.ud.occupation,
    description: this.ud.description
  } 
  console.log("before "+ this.ud.occupation);
  const encodedData = encodeURIComponent(JSON.stringify(formData));

  if (intersector && !this.routeChanged ) {
    console.log("STILL LOADED!!!")
   this.$router.push({
    path: '/profile',
    query: { form: encodedData }
    });
    this.cleanup();
  }

},
   loadProfile(){
      console.log("tbi");
    },
    loadRoster(){
      if (!this.loadedScene){
        const light = new THREE.DirectionalLight(0xffffff, 9);
        light.position.set(1, 1, 1);
        this.scene.add(light);

        window.addEventListener('scroll', () => {
        // Map scroll to horizontal/vertical movement
           this.targetOffset = window.scrollY * 0.1; // Adjust multiplier for speed
        });


       this.raycaster = new THREE.Raycaster()
       this.mouse = new THREE.Vector2()
       this.hoveredMesh = null

      this.wheelHandler = (event) => {
          if (this.scrollEnabled) {
            event.preventDefault();
            const scrollSpeed = 0.01; // adjust this as needed
            this.camera.position.y += event.deltaY * scrollSpeed;
            if (this.camera.position.y < 0 || this.camera.position.y > 10) {
              this.camera.position.y -= event.deltaY * scrollSpeed;
            }
          }
        };

        // Add the event listener when your page/component loads
        window.addEventListener('wheel', this.wheelHandler, { passive: false });
  // Mousemove
      window.addEventListener('mousemove', (event) => {
          this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
          this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
      })
      }
      // Load multiple models

        var end = 6;

        if (end > this.image.length){

          end = this.image.length;
        }

        var increment = 0;
        var yinc = 0;
        for (var i = 0; i < end; i++){
          const cardscale = 1.1;
          const fscale = cardscale * 9/10;
          if ( i % 3 == 0){
            yinc = i;
            increment = 0;
          }

          var cardposx = -7 + 5*increment;
          var cardposy = 2 - yinc;

          
          increment++;
          var cardposz = -13;

          this.zrotation = 0;
          this.xrotation = 0;   //2.34;
          this.yrotation = 4.7; // 4.7

          this.loadModel('/models/card.glb', { x: cardposx, y: cardposy, z: cardposz }, { x: cardscale, y: cardscale, z: cardscale }, "glass", i);
          this.loadModel('/models/frame.glb', { x: cardposx-0.4, y: cardposy, z: cardposz}, { x: cardscale*fscale, y: cardscale*fscale, z: cardscale*fscale}, "frame", i);
          this.modellimit += 2;
        }

    },
    createText(text, size, x, y, z){
      const myText = new Text()
       myText.text = text
       myText.fontSize = size
       myText.color = 0xffcc00              // Gold


       
       // Optional styles
       myText.strokeColor = 0xffaa00        // Outline/glow
       myText.strokeWidth = 0.02
       myText.outlineBlur = 0.01
       myText.outlineOffsetX = 0.005
       myText.outlineOffsetY = 0.00
       // Must update after setting text/props
       myText.sync()
       this.scene.add(myText)
       myText.position.set(x, y, z)

    },
    loadhome(){
        if (!this.loadedScene){
        const light = new THREE.DirectionalLight(0xffffff, 9);
        light.position.set(1, 1, 1);
        this.scene.add(light);

        window.addEventListener('scroll', () => {
        // Map scroll to horizontal/vertical movement
           this.targetOffset = window.scrollY * 0.1; // Adjust multiplier for speed
        });


       this.raycaster = new THREE.Raycaster()
       this.mouse = new THREE.Vector2()
       this.hoveredMesh = null

      this.wheelHandler = (event) => {
          if (this.scrollEnabled) {
            event.preventDefault();
            const scrollSpeed = 0.01; // adjust this as needed
            this.camera.position.x += event.deltaY * scrollSpeed;
            if (this.camera.position.x < -11 || this.camera.position.x > 8) {
              this.camera.position.x -= event.deltaY * scrollSpeed;
            }
          }
        };

        // Add the event listener when your page/component loads
        window.addEventListener('wheel', this.wheelHandler, { passive: false });

  // Mousemove
      window.addEventListener('mousemove', (event) => {
          this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1
          this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
      })
      }
      // Load multiple models

        var end = 6;

        if (end > this.image.length){

          end = this.image.length;
        }

        for (var i = 0; i < end; i++){
          const cardscale = 1.1;
          const fscale = cardscale * 9/10;

          var cardposx = -14 + 5*i;
          var cardposy = 0;
          var cardposz = -13;

          this.zrotation = 0;
          this.xrotation = 0;   //2.34;
          this.yrotation = 4.7; // 4.7

          this.loadModel('/models/card.glb', { x: cardposx, y: cardposy, z: cardposz }, { x: cardscale, y: cardscale, z: cardscale }, "glass", i);
          this.loadModel('/models/frame.glb', { x: cardposx-0.4, y: cardposy, z: cardposz}, { x: cardscale*fscale, y: cardscale*fscale, z: cardscale*fscale}, "frame", i);
          this.modellimit += 2;
        }

       
      },
    cleanup() {
      // Dispose of all models

        window.removeEventListener('wheel', this.wheelHandler, { passive: false });
      if (this.renderer) {
        this.renderer.dispose?.();

        // If you're using WebGLRenderer
        this.renderer.forceContextLoss?.();
        this.renderer.domElement = null;
        this.renderer = null;
      }

      if (this.scene) {
        this.scene.traverse((object) => {
          if (!object.isMesh) return;

          object.geometry?.dispose();
          if (object.material?.map) object.material.map.dispose();
          object.material?.dispose();
        });
        this.scene = null;
      }

      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
      }

      window.removeEventListener('resize', this.handleResize);
    },
    loadCard(image, bio, text){
      console.log("will be the card constructor")
    }, 
    disposeThree() {
      // Example cleanup:
      if (this.renderer) {
        this.renderer.dispose?.();

        // If you're using WebGLRenderer
        this.renderer.forceContextLoss?.();
        this.renderer.domElement = null;
        this.renderer = null;
      }

      if (this.scene) {
        this.scene.traverse((object) => {
          if (!object.isMesh) return;

          object.geometry?.dispose();
          if (object.material?.map) object.material.map.dispose();
          object.material?.dispose();
        });
        this.scene = null;
      }

      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
      }

      window.removeEventListener('resize', this.handleResize);
    },
    loadModel(path, position, scale, type, idx) {
      const loader = new GLTFLoader();
      // Set default values if not provided
      position = position || { x: 0, y: 0, z: 0 };
      scale = scale || { x: 1, y: 1, z: 1 };
      console.log(position);
      loader.load(
        path,
        (gltf) => {
          const model = gltf.scene;

          if (type == "glass"){
            model.traverse((child) => {
            if (child.isMesh) {
              // Replace the material with glass-like material
              child.material = new THREE.MeshPhysicalMaterial({
                 color: 0xffffff,
                transmission: 1.0001,            // full see-through
                opacity: 1.0,                 // doesn't affect when transmission is on
                roughness: 0.3,              // slight blur on reflections
                metalness: 0.0,               // pure dielectric, not metallic
                ior: .8,                    // realistic for glass
                thickness: 0.1,               // low to avoid distortion
                specularIntensity: 0.5,       // subtle specular
                clearcoat: 0.2,               // just a touch of coating
                clearcoatRoughness: 0.2,      // slightly matte
                //envMap: this.envMap,          // your HDR reflection map
                //envMapIntensity: 0.8,
                transparent: true,
                side: THREE.DoubleSide 
              });
              
              // Enable shadows for more realism
              child.castShadow = true;
              child.receiveShadow = true;
              child.userData.originalMaterial = child.material.clone();
              child.userData.modelType = "glass";
              child.userData.image = this.image[idx]
              child.userData.recepient = this.recepient[idx]
              child.userData.occupation = this.occupation[idx]
              child.userData.description = this.description[idx]
              console.log("desired "+this.occupation[idx])
              console.log("obtained "+child.userData.occupation)
              //this.clickableObjects.push(child);

            }
          });

           const longtext = this.description[idx]
    

          let result = '';
          let currentLineLength = 0;
          let charcount = 0; 
          for (let i = 0; i < longtext.length; i++) {

            if (charcount >= 440) {
              result += ' ...';
              break;
            }

            const char = longtext[i];
            result += char;
            currentLineLength++;
            charcount++;
            // If we've just added a space and we're past the line length limit
            if (char === ' ' && currentLineLength >= 53) {
              result += '\n'; // Add newline
              currentLineLength = 0; // Reset line length counter
            }
          }




          this.createText(this.recepient[idx], 0.4, position.x - 1.9, position.y  + .9, position.z)
          this.createText(this.occupation[idx], this.dsize, position.x - 1.9, position.y + .35, position.z)
          this.createText(result, this.dsize, position.x - 1.9, position.y + .1, position.z)
          console.log("going in "+model+" "+this.image.length)
          }






          model.position.set(position.x, position.y, position.z);
          model.scale.set(scale.x, scale.y, scale.z);
          

          if (type == "frame"){
            const loader = new THREE.TextureLoader();
            loader.setCrossOrigin('anonymous');
            //this.image[0] = 'https://drive.google.com/file/d/1sGQOMkTPW0yxVlSnRXovfv24Gs693p8u/view?usp=sharing';
            const maskURL = 'https://res.cloudinary.com/ddljxrzve/image/upload/v1746308392/ovalmask_udotgw.png';
            loader.load(this.image[idx], (imageTexture) => {
               loader.load(maskURL, (maskTexture) => {
              const imageAspect = imageTexture.image.width / imageTexture.image.height;
              
              const planeWidth = 180;
              const planeHeight = 1.6;
              
              imageTexture.wrapS = THREE.ClampToEdgeWrapping;
              imageTexture.wrapT = THREE.ClampToEdgeWrapping;
              maskTexture.wrapS = THREE.ClampToEdgeWrapping;
              maskTexture.wrapT = THREE.ClampToEdgeWrapping;

              imageTexture.offset.set(0, 0);    // Horizontal and vertical offset (0-1 range)
              imageTexture.repeat.set(2, 1);
              maskTexture.offset.set(0, 0);    // Horizontal and vertical offset (0-1 range)
              maskTexture.repeat.set(2, 1);

              const material = new THREE.MeshBasicMaterial({
                map: imageTexture,
                alphaMap: maskTexture,     // <-- this is the key
                transparent: false,
                alphaTest: 0.5, 
                side: THREE.DoubleSide
              });


              const imagePlane = new THREE.Mesh(
              new THREE.PlaneGeometry(planeWidth, planeHeight),
              material
            );
              
              model.add(imagePlane);
              imagePlane.position.set(0, 0, 2.65);

              console.log("Image plane added successfully");


                });

            });
            console.log("showing it")
          

          
          }

      
            this.objectsToDispose.push(model);
            this.scene.add(model);
            this.models.push(model);
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        (error) => {
          console.error(`Error loading ${path}:`, error);
        }
      );
    }
   
  },
   beforeUnmount() {
  if (this.boundMouseHandler) {
    window.removeEventListener('click', this.boundMouseHandler);
  }

  if (this.scrollHandler) {
    window.removeEventListener('scroll', this.scrollHandler);
  }

  if (this.mouseMoveHandler) {
    window.removeEventListener('mousemove', this.mouseMoveHandler);
  }

  //this.cleanup();
}
};



</script>

<style scoped>
.three-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
