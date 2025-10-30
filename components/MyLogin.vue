 <template>
    <div class="overlay" @click.self="close">
        <div class="login-box">
          <h2>Login</h2>
          <input type="email" placeholder="Email" />
          <button @click="submit">Verify</button>
          <button @click="close">Cancel</button>
        </div>
    </div>
</template> 

<script>
export default{
  props: {
    show:{
      type: Boolean,
      default: true,
    },
  },
  methods:{
    close(){
    this.$emit("close");
  }
  }
}
</script>

<style>
.overlay {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
      backdrop-filter: blur(10px);
      display: grid;
      place-items: center;
      z-index: 200;
      transition: opacity 0.3s ease;
    }
.login-box {
    background: #1c1c1c;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    color: white;
    width: 300px;
    text-align: center;
}
.login-box input {
  width: 100%;
  margin: 0.5rem 0;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #333;
  background: #111;
  color: white;
}
.login-box button {
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.75rem;
  border-radius: 8px;
  border: none;
  background: #d4af37;
  color: #111;
  font-weight: 700;
  cursor: pointer;
}
</style>