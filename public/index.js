const socket = io();

let userName = prompt("Ingresa tu nombre");

socket.on("message_back", (data) => {
  console.log(data);
  render(data);

  socket.emit("message_front", "gracias, soy el cliente");
});

const render = (data) => {
  let html = data
    .map((x) => {
      return `<p><Strong>${x.user}</Strong>:${x.msg}</p>`;
    })
    .join(" ");
  document.querySelector("#box").innerHTML = html;
};

const addMessage = () => {
  let dataObj = {
    user: userName,
    msg: document.getElementById("msg").value,
  };
  console.log(dataObj);
  socket.emit("msg_client", dataObj);
  document.getElementById("msg").value = "";

  return false;
};
