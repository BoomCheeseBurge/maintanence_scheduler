    <main class="form-signin w-100 m-auto">
        <form action="<?= BASEURL; ?>/Signup/add" method="POST">
            <div> <?php Flasher::flash(); ?> </div>
            
            <h1 class="h3 mb-3 fw-normal">Please fill the form</h1>

            <div class="form-floating">
                <input type="text" class="form-control" id="floatingInputFullname" name="name" placeholder="Fullname" required>
                <label for="floatingInputFullname">Full Name</label>
            </div>
            <div class="form-floating">
                <input type="email" class="form-control" id="floatingInputemail" name="email" placeholder="name@example.com" required>
                <label for="floatingInputemail">Email</label>
            </div>
            <div class="form-floating">
                <input type="password" class="form-control" id="floatingPassword" name="password" placeholder="Password" required>
                <label for="floatingPassword">Password</label>
            </div>
            <button class="btn btn-primary w-100 py-2" type="submit">Sign up</button>            
        </form>
    </main>

    