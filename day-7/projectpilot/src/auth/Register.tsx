import { useState, type SyntheticEvent } from "react";
import { useRegister } from "./authHooks";
import { User } from "./User";

function Register() {
    const [user, setUser] = useState(new User());
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: ''
    });
    const { mutate: register, isPending } = useRegister();
    const handleSubmit = async (event: SyntheticEvent) => {
        event.preventDefault();
        if (!isValid()) return;
        register(user);
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
        let errors: any = { name: '', email: '', password: '' };
        if (user.name.length === 0) {
            errors.name = 'Name is required';
        }
        if (user.name.length > 0 && user.name.length < 3) {
            errors.name = 'Name needs to be at least 3 characters.';
        }
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
            errors.name.length === 0 &&
            errors.email.length === 0 &&
            errors.password.length === 0
        );
    }

    return (
        <form className="input-group vertical" onSubmit={handleSubmit}>
            {isPending && <span className="toast">Saving...</span>}
            <label htmlFor="name">Name</label>
            <input type="text" name="name" placeholder="enter name" value={user.name}
                onChange={handleChange} />
            {errors.name.length > 0 && (
                <div className="card error">
                    <p>{errors.name}</p>
                </div>
            )}
            <label htmlFor="email">Email</label>
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
                <button className="primary bordered medium">Register</button>
            </div>
        </form>
    );
}

export default Register;