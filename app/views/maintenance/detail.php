    <div class="container d-flex align-items-center justify-content-center flex-column">
        <h2>Maintenance Title</h2>
        <div class="container-box">
            <div class="div-box">
                <h3>Assignee</h3>
                <!-- Assignee's name will be passed from the controller -->
                <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Assignee Name" readonly>
                <!-- When this edit button is triggered, a modal will pop up where the admin support can change the assignee -->
                <button class="btn btn-outline-secondary" type="button" data-bs-toggle="modal" data-bs-target="#editAssigneeModal">Edit</button>
                </div>

                <!-- Maintenance status will be passed from the controller -->
                <span><h3>Status</h3></span>
                <div>Maintenance Status</div>

                <!-- Only show this section to an engineer user that is specifically assigned to this maintenance -->
                <span><h3>Report</h3></span>
                <div class="mb-3">
                    <form action="" method="post">
                        <label for="formFile" class="form-label">Maintenance Report</label>
                        <input class="form-control" type="file" id="formFile">
                        <button type="submit" class="mt-2 maintenance-view-btn">Upload</button>
                    </form>
                </div>

                <!-- Only show this section to the admin support -->
                <span><h3>Submitted Report</h3></span>
                <div class="mb-3">
                    <p>report_file.pdf</p>
                    <p>Submitted on mm/dd/yyyy at hh:mm (24-hour format)</p>
                </div>

            </div>
            <span class="vl"></span>
            <div class="div-box">

                <h3>Activity Log and Follow-up</h3>

                <div class="log-box">
                    <div class="log-messages" id="logMessages">
                        <!-- Messages will be added dynamically here -->
                        <div class="message received">Assignee: Hi, how can I help you?</div>
                        <div class="message sent">You: I need to discuss the task status.</div>
                    </div>
                    <div class="log-input">
                        <input type="text" id="messageInput" placeholder="Type your message...">
                        <button class="maintenance-view-btn">Send</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Modal -->
<div class="modal fade" id="editAssigneeModal" tabindex="-1" aria-labelledby="editAssigneeModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="editAssigneeModalLabel">Replace Assignee</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <!-- Admin support is able to change the assignee from here -->
        <!-- After the admin support click the edit button the div above is put hidden -->
        <!-- The div below is displayed -->
        <form action="#" method="post">
            <div class="input-box">
                <span class="icon">
                <i class="fa-solid fa-user"></i>
                </span>
                <input type="search" name="assignee" id="assignee" required>
                <div id="assigneeList"></div>
                <label for="assignee">Assigned Engineer</label>
            </div>
        <!-- As seen above, it is the same input field as in the create new task form -->
        <!-- Admin support can search for the engineer replacement in the input field -->
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="submit" class="btn btn-primary">Save changes</button>
        </form>
      </div>
    </div>
  </div>
</div>
