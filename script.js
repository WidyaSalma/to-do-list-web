document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    let taskInput = document.getElementById("taskInput");
    let taskText = taskInput.value.trim();
    if (taskText === "") {
        Swal.fire("Oops!", "Tugas tidak boleh kosong!", "warning");
        return;
    }
    
    let li = document.createElement("li");
    li.innerHTML = `<span>${taskText}</span> 
                    <div class="task-actions">
                        <button class="check-btn" onclick="toggleTask(this)">✔️</button>
                        <button class="edit-btn" onclick="editTask(this)">✏️</button>
                        <button class="delete-btn" onclick="removeTask(this)">❌</button>
                    </div>`;
    document.getElementById("taskList").appendChild(li);
    
    saveTasks();
    taskInput.value = "";
}

function removeTask(button) {
    Swal.fire({
        title: "Yakin ingin menghapus?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, hapus!",
        cancelButtonText: "Batal"
    }).then((result) => {
        if (result.isConfirmed) {
            button.parentElement.parentElement.remove();
            saveTasks();
        }
    });
}

function editTask(button) {
    let taskSpan = button.parentElement.parentElement.querySelector("span");
    Swal.fire({
        title: "Edit Tugas",
        input: "text",
        inputValue: taskSpan.textContent,
        showCancelButton: true,
        confirmButtonText: "Simpan",
        cancelButtonText: "Batal"
    }).then((result) => {
        if (result.isConfirmed && result.value.trim() !== "") {
            taskSpan.textContent = result.value;
            saveTasks();
        }
    });
}

function toggleTask(button) {
    let taskSpan = button.parentElement.parentElement.querySelector("span");
    taskSpan.classList.toggle("completed");
    saveTasks();
}

function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        let taskText = li.querySelector("span").textContent;
        let completed = li.querySelector("span").classList.contains("completed");
        tasks.push({ text: taskText, completed: completed });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        let li = document.createElement("li");
        let completedClass = task.completed ? "completed" : "";
        li.innerHTML = `<span class="${completedClass}">${task.text}</span> 
                        <div class="task-actions">
                            <button class="check-btn" onclick="toggleTask(this)">✔️</button>
                            <button class="edit-btn" onclick="editTask(this)">✏️</button>
                            <button class="delete-btn" onclick="removeTask(this)">❌</button>
                        </div>`;
        document.getElementById("taskList").appendChild(li);
    });
}

function clearTasks() {
    Swal.fire({
        title: "Hapus semua tugas?",
        text: "Tindakan ini tidak dapat dikembalikan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, hapus semua!",
        cancelButtonText: "Batal"
    }).then((result) => {
        if (result.isConfirmed) {
            document.getElementById("taskList").innerHTML = "";
            localStorage.removeItem("tasks");
            Swal.fire("Dihapus!", "Semua tugas telah dihapus.", "success");
        }
    });
}