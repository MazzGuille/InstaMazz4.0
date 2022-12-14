import { defineStore } from 'pinia'
import { Validaciones } from "./Validaciones"
import router from "@/router";
import { ref } from 'vue'
import axios from "axios";


export const LogReg = defineStore('LogReg', () => {
  const storeValidaciones = Validaciones

  const Email = ref('')
  const Nombre = ref('Guillermo Mazzari')
  const UserName = ref('Mazzcode')
  const Contraseña = ref('')
  const ConfirmarClave = ref('')
  const BioUsuario = ref('')
  const rutaDocumento = ref('null')
  const mailExist = ref(false)
  const credentials = ref(false)
  const created = ref(false)

  const valMailExist = () => {
    mailExist.value = true
  }

  const valCredentials = () => {
    credentials.value = true
  }

  const redirect = () => {
    window.scrollTo(0, 0)
    created.value = true
  }

  const iniciarSesion = () => {
    let jsonDatos = {
      Email: Email.value,
      Contraseña: Contraseña.value
    }

    axios.post('https://localhost:7158/api/Usuario/Login', jsonDatos).then(res => {
      console.log(res)
      if (res.status === 200) {
        credentials.value = false
        Email.value = ''
        Contraseña.value = ''
        router.push("/Profile")
      } else {
        valCredentials()
      }
    }).catch(function (error) {
      console.log(error)
    })
  }

  const imgPrefil = (formData) => {
    axios.post('https://localhost:7158/api/Usuario/CargarArchivo', formData).then(res => {
      console.log(res)
    }).catch(function (error) {
      console.log(error)
    })
  }

  const CrearUsuario = () => {
    let jsonDatos = {
      Email: Email.value,
      Nombre: Nombre.value,
      UserName: UserName.value,
      Contraseña: Contraseña.value,
      ConfirmarClave: ConfirmarClave.value,
      BioUsuario: BioUsuario.value
    }

    axios.post('https://localhost:7158/api/Usuario/CrearUsuario', jsonDatos).then(res => {
      console.log(res)
      if (res.status === 200) {
        redirect()
      } else if (res.status === 204) {
        window.scrollTo(0, 0)
        valMailExist()
      } else if (res.status === 400) {
        alert('Error inesperado')
      }
    }).catch(function (error) {
      console.log(error)
    })
  }

  return {
    Email,
    Contraseña,
    Nombre,
    UserName,
    ConfirmarClave,
    BioUsuario,
    iniciarSesion,
    CrearUsuario,
    valMailExist,
    mailExist,
    credentials,
    valCredentials,
    redirect,
    created,
    rutaDocumento,
    imgPrefil
  }
})
