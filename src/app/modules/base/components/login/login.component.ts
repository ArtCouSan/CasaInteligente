import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @Output() loginSuccess = new EventEmitter<void>(); // Evento para notificar o sucesso no login

  loginForm: FormGroup;
  isLoginModalVisible = true; // Controla a visibilidade do modal
  errorMessage: string = '';

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar) {
    // Inicializa o formulário de login
    this.loginForm = this.fb.group({
      cpf: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const { cpf, password } = this.loginForm.value;

      this.authService.login(cpf, password).subscribe(
        response => {
          this.loginSuccess.emit(); // Emite o evento de sucesso no login
          this.closeLoginModal();   // Fecha o modal de login localmente (opcional)
        },
        error => {
          this.errorMessage = 'Invalid login credentials';
          this.snackBar.open('CPF ou senha incorretos', 'Close', {
            duration: 3000,  // Snackbar will be visible for 3 seconds
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        }
      );
    }
  }

  // Função para fechar o modal de login
  closeLoginModal() {
    this.isLoginModalVisible = false;
  }

  // Função para abrir o modal de cadastro (simulação)
  openSignup() {
    alert('Redirecionando para a página de cadastro...');
  }
}
