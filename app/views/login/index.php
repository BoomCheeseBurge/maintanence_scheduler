<div class="d-flex align-items-center py-4 bg-body-tertiary">
    <main class="form-signin w-100 m-auto">
        <form id="loginForm" action="<?= BASEURL; ?>/login/validate" method="POST"> 
            <div> <?php Auth_Flasher::flash(); ?> </div>
            
            <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
            <div class="form-floating">
                <input type="email" class="form-control" id="floatingInput" name="email" placeholder="name@example.com" required>
                <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
                <input type="password" class="form-control" id="floatingPassword" name="password" placeholder="Password" required>
                <label for="floatingPassword">Password</label>
            </div>

            <!-- <div class="form-check text-start my-3">
                <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault" name="remember">
                <label class="form-check-label" for="flexCheckDefault">
                    Remember me
                </label>
            </div> -->
            <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
            <p class="fs-8 text-justified text-center">
                <!-- <a href="/Signup/index"><span>Need an Account?</span></a> -->
                <a href="<?= BASEURL; ?>/ForgottenPassword/index" class="ms-3"><span>Forgotten your details?</span></a>
            </p>
        </form>
    </main>
</div>