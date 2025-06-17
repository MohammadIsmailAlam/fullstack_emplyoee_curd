import { useState } from "react";
import styles from "./AuthForm.module.scss";
import type { AuthFormData } from "../types/auth";

interface AuthFormProps {
  onLogin: (data: AuthFormData) => void;
  onRegister: (data: Required<AuthFormData>) => void;
}

const AuthForm = ({ onLogin, onRegister }: AuthFormProps) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isLogin) {
      if (!formData.email || !formData.password) {
        setError("Please fill in all fields");
        return;
      }
      onLogin(formData);
    } else {
      if (!formData.name || !formData.email || !formData.password) {
        setError("Please fill in all fields");
        return;
      }
      onRegister(formData as Required<AuthFormData>);
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={styles.tabs}>
        <button
          type="button"
          className={`${styles.tab} ${isLogin ? styles.active : ""}`}
          onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          type="button"
          className={`${styles.tab} ${!isLogin ? styles.active : ""}`}
          onClick={() => setIsLogin(false)}
        >
          Register
        </button>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        {error && <p className={styles.errorMessage}>{error}</p>}

        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className={styles.input}
            value={formData.name}
            onChange={handleChange}
          />
        )}

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className={styles.input}
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className={styles.input}
          value={formData.password}
          onChange={handleChange}
          required
          minLength={6}
        />

        <button type="submit" className={styles.button}>
          {isLogin ? "Login" : "Register"}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
