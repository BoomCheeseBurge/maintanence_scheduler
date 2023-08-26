    <div class="container text-center">
        <div class="card text-center mx-auto" style="width: 300px;">
            <div class="card-header h5 text-white bg-primary">Password Reset</div>
            <div class="card-body px-5">
                <p class="card-text py-2">
                    Enter your email address and we'll send you an email with instructions to reset your password.
                </p>
                <div class="form-outline">

                    <div id="customAlertContainer" style="display:none;"></div>

                    <input type="email" id="typeEmail" class="form-control my-3" required />
                    <label class="form-label" for="typeEmail">Email input</label>
                </div>
                
                <a href="#" class="btn btn-primary w-100 resetPassword">Reset password</a>

                <div class="text-justified text-center mt-4">
                    <a class="" href="<?= BASEURL ?>/login">Login</a>
                    <!-- <a class="" href="/signup">Need an Account?</a> -->
                </div>
            </div>
        </div>
    </div>