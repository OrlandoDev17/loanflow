import { useState, useEffect } from "react";
import axios from "axios";

// Tipos
interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  telefono: string;
  correo: string;
  direccion: string;
}

interface Prestamo {
  id: number;
  monto: number;
  cuotas: number;
  interes: number;
  fechaInicio: string;
  frecuenciaPago: string;
  nota?: string;
  cliente: Cliente;
}

function App() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [prestamos, setPrestamos] = useState<Prestamo[]>([]);

  const [clienteForm, setClienteForm] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    correo: "",
    direccion: "",
  });

  const [prestamoForm, setPrestamoForm] = useState({
    clienteId: "",
    monto: "",
    cuotas: "",
    interes: "",
    fechaInicio: "",
    frecuenciaPago: "mensual",
    nota: "",
  });

  // Cargar clientes al iniciar
  useEffect(() => {
    axios
      .get<Cliente[]>("http://localhost:3000/clientes")
      .then((res) => setClientes(res.data))
      .catch((err) => console.error("Error al cargar clientes", err));
  }, []);

  // Crear cliente
  const crearCliente = async () => {
    try {
      const res = await axios.post<Cliente>(
        "http://localhost:3000/clientes",
        clienteForm
      );
      setClientes([...clientes, res.data]);
      setClienteForm({
        nombre: "",
        apellido: "",
        telefono: "",
        correo: "",
        direccion: "",
      });
    } catch (err) {
      console.error("Error al crear cliente", err);
    }
  };

  // Crear préstamo
  const crearPrestamo = async () => {
    try {
      const res = await axios.post<Prestamo>(
        "http://localhost:3000/prestamos",
        {
          ...prestamoForm,
          clienteId: parseInt(prestamoForm.clienteId),
          monto: parseFloat(prestamoForm.monto),
          cuotas: parseInt(prestamoForm.cuotas),
          interes: parseFloat(prestamoForm.interes),
        }
      );
      alert("Préstamo creado");
      setPrestamoForm({
        clienteId: "",
        monto: "",
        cuotas: "",
        interes: "",
        fechaInicio: "",
        frecuenciaPago: "mensual",
        nota: "",
      });
    } catch (err) {
      console.error("Error al crear préstamo", err);
    }
  };

  // Ver préstamos
  const cargarPrestamos = async () => {
    try {
      const res = await axios.get<Prestamo[]>(
        "http://localhost:3000/prestamos"
      );
      setPrestamos(res.data);
    } catch (err) {
      console.error("Error al cargar préstamos", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Crear Cliente</h2>
      <input
        placeholder="Nombre"
        value={clienteForm.nombre}
        onChange={(e) =>
          setClienteForm({ ...clienteForm, nombre: e.target.value })
        }
      />
      <input
        placeholder="Apellido"
        value={clienteForm.apellido}
        onChange={(e) =>
          setClienteForm({ ...clienteForm, apellido: e.target.value })
        }
      />
      <input
        placeholder="Teléfono"
        value={clienteForm.telefono}
        onChange={(e) =>
          setClienteForm({ ...clienteForm, telefono: e.target.value })
        }
      />
      <input
        placeholder="Correo"
        value={clienteForm.correo}
        onChange={(e) =>
          setClienteForm({ ...clienteForm, correo: e.target.value })
        }
      />
      <input
        placeholder="Dirección"
        value={clienteForm.direccion}
        onChange={(e) =>
          setClienteForm({ ...clienteForm, direccion: e.target.value })
        }
      />
      <button onClick={crearCliente}>Guardar Cliente</button>

      <h2>Crear Préstamo</h2>
      <select
        value={prestamoForm.clienteId}
        onChange={(e) =>
          setPrestamoForm({ ...prestamoForm, clienteId: e.target.value })
        }
      >
        <option value="">Seleccionar cliente</option>
        {clientes.map((c) => (
          <option key={c.id} value={c.id}>
            {c.nombre} {c.apellido}
          </option>
        ))}
      </select>
      <input
        placeholder="Monto"
        value={prestamoForm.monto}
        onChange={(e) =>
          setPrestamoForm({ ...prestamoForm, monto: e.target.value })
        }
      />
      <input
        placeholder="Cuotas"
        value={prestamoForm.cuotas}
        onChange={(e) =>
          setPrestamoForm({ ...prestamoForm, cuotas: e.target.value })
        }
      />
      <input
        placeholder="Interés (%)"
        value={prestamoForm.interes}
        onChange={(e) =>
          setPrestamoForm({ ...prestamoForm, interes: e.target.value })
        }
      />
      <input
        type="date"
        value={prestamoForm.fechaInicio}
        onChange={(e) =>
          setPrestamoForm({ ...prestamoForm, fechaInicio: e.target.value })
        }
      />
      <select
        value={prestamoForm.frecuenciaPago}
        onChange={(e) =>
          setPrestamoForm({ ...prestamoForm, frecuenciaPago: e.target.value })
        }
      >
        <option value="mensual">Mensual</option>
        <option value="quincenal">Quincenal</option>
        <option value="semanal">Semanal</option>
      </select>
      <input
        placeholder="Nota (opcional)"
        value={prestamoForm.nota}
        onChange={(e) =>
          setPrestamoForm({ ...prestamoForm, nota: e.target.value })
        }
      />
      <button onClick={crearPrestamo}>Guardar Préstamo</button>

      <h2>Ver Préstamos</h2>
      <button onClick={cargarPrestamos}>Cargar Préstamos</button>
      <ul>
        {prestamos.map((p) => (
          <li key={p.id}>
            Cliente: {p.cliente.nombre} {p.cliente.apellido} | Monto: {p.monto}{" "}
            | Cuotas: {p.cuotas} | Frecuencia: {p.frecuenciaPago} | Nota:{" "}
            {p.nota || "—"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
