
let appointments = [];

function addAppointment(clientName, appointmentTime, serviceType) {
  try {
    if (!clientName || clientName.trim() === "") {
      throw new Error("Client name cannot be empty.");
    }
    const time = new Date(appointmentTime);
    if (isNaN(time.getTime())) {
      throw new Error("Invalid appointment time.");
    }
    const newAppointment = { clientName, appointmentTime: time, serviceType };
    appointments.push(newAppointment);
    displayUpcomingAppointments();
    scheduleReminder(newAppointment);
  } catch (error) {
    alert(error.message);
  }
}

function displayUpcomingAppointments() {
  const now = new Date();
  const oneHourLater = new Date(now.getTime() + 60 * 60 * 1000);

  const upcomingAppointments = appointments.filter(appointment => {
    return appointment.appointmentTime > now && appointment.appointmentTime <= oneHourLater;
  });

  const appointmentList = document.getElementById("appointmentList");
  appointmentList.innerHTML = "";
  
  upcomingAppointments.forEach(appointment => {
    const listItem = document.createElement("li");
    listItem.textContent = `${appointment.clientName} - ${appointment.serviceType} at ${appointment.appointmentTime.toLocaleTimeString()}`;
    appointmentList.appendChild(listItem);
  });
}

function scheduleReminder(appointment) {
  const timeDifference = appointment.appointmentTime - new Date();
  if (timeDifference > 0) {
    setTimeout(() => {
      alert(`Reminder: Your appointment for ${appointment.serviceType} with ${appointment.clientName} is scheduled at ${appointment.appointmentTime.toLocaleTimeString()}`);
    }, timeDifference - 10 * 60 * 1000);
  }
}

document.getElementById("appointmentForm").addEventListener("submit", function(event) {
  event.preventDefault();
  
  const clientName = document.getElementById("clientName").value;
  const appointmentTime = document.getElementById("appointmentTime").value;
  const serviceType = document.getElementById("serviceType").value;

  addAppointment(clientName, appointmentTime, serviceType);
  event.target.reset(); 
});

displayUpcomingAppointments();

