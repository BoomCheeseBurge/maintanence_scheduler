  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header bg-primary text-white text-center">
            <h4>Reset Your Password</h4>
          </div>
          <div class="card-body">
            <form id="resetPasswordForm" action="http://localhost/nutrire/public/forgottenpassword/change_password" method="post">
              <div class="form-group">
                <label for="newPassword">New Password</label>
                <input type="password" name="newPassword" id="newPassword" class="form-control" required>
              </div>
              <div class="form-group mt-3">
                <label for="confirmPassword">Confirm Password</label>
                <input type="password" name="confirmPassword" id="confirmPassword" class="form-control" required>
              </div>

              <input type="hidden" id="token" name="token" value="<?= $_GET['token'] ?>">

              <button type="submit" class="btn btn-primary btn-block mt-3">Reset Password</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
