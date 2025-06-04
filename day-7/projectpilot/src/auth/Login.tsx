import { useState, type SyntheticEvent } from "react";
import { useLogin } from "./authHooks";
import { User } from "./User";

function Login() {
    const [user, setUser] = useState(new User());
    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });
    const { mutate: login, isPending } = useLogin();
    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        if (!isValid()) return;
        login(user);
    };

    const handleChange = (event: any) => {
        const { type, name, value, checked } = event.target;
        // if input type is checkbox use checked
        // otherwise it's type is text, number etc. so use value
        let updatedValue = type === 'checkbox' ? checked : value;

        //if input type is number convert the updatedValue string to a +number
        if (type === 'number') {
            updatedValue = Number(updatedValue);
        }
        const change = {
            [name]: updatedValue,
        };

        let updatedUser: User;

        setUser((u) => {
            updatedUser = new User({ ...u, ...change });
            return updatedUser;
        });
        setErrors(() => validate(updatedUser));
    };

    const validateEmail = (email: string) => {
        // Simple email regex pattern
        const regex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
        return regex.test(email);
    };

    function validate(user: User) {
        let errors: any = { email: '', password: '' };
        if (user.email.length === 0) {
            errors.email = 'Email is required';
        }
        if (user.email.length > 0 && !validateEmail(user.email)) {
            errors.email = 'Email invalid.';
        }
        if (user.password.length === 0 ) {
            errors.password = 'Password is required.';
        }
        if (user.password.length > 0 && user.password.length < 8) {
            errors.password = 'Password needs to be at least 8 characters.';
        }
        return errors;
    }

    function isValid() {
        return (
            errors.email.length === 0 &&
            errors.password.length === 0
        );
    }

    return (
        <form className="input-group vertical" onSubmit={handleSubmit}>
            {isPending && <span className="toast">Login...</span>}
            <label htmlFor="email">Name</label>
            <input type="email" name="email" placeholder="enter email" value={user.email}
                onChange={handleChange} />
            {errors.email.length > 0 && (
                <div className="card error">
                    <p>{errors.email}</p>
                </div>
            )}
            <label htmlFor="password">Password</label>
            <input type="password" name="password" placeholder="enter password" value={user.password}
                onChange={handleChange} />
            {errors.password.length > 0 && (
                <div className="card error">
                    <p>{errors.password}</p>
                </div>
            )}
            <div className="input-group">
                <button className="primary bordered medium">Login</button>
            </div>
        </form>
    );
}

export default Login;