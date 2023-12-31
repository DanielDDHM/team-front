import LocalizedStrings from 'react-localization';

export default new LocalizedStrings({
	/* cSpell:enable */
	/* cSpell.language:pt,pt_PT */
	pt: {
		// Generic
		generic: {
			profile: 'Perfil',
			save: 'Guardar',
			confirm: 'Confirmar',
			supportPlan: 'Plano de Apoio psicológico ao colaborador',
			permit: 'Permitir',
			noThankYou: 'Não, obrigado(a)',
			receiveNotificationsDescription: 'Gostaríamos de lhe mostrar notificações relativas às suas consultas.',
			yes: 'Sim',
			no: 'Não',
		},

		fields: {
			startDate: "Data Inicial",
			endDate: "Data Final",
		},

		sidebar: {
			home: 'Início',
			appointments: 'Consultas',
			chat: 'Chat',
			profile: 'Perfil',
			hello: 'Olá',
			terms: 'Termos e Condições',
			privacy: 'Política de Privacidade',
		},

		language: {
			header: 'Idioma',
			defaultLanguage: 'Idioma Padrão',
			languageNotActive: 'Guarde as atualizações antes de proceder à alteração do idioma padrão.',
			portuguese: 'Português',
			english: 'Inglês',
			german: 'Alemão',
			french: 'Francês',
			spanish: 'Espanhol',
		},

		// Screens
		authentication: {
			welcome: 'Bem-vindo',
			header: 'Autenticação',
			register: 'Registo',
			login: 'Login',
			logout: 'Logout',
			signIn: 'Entrar',
			signOut: 'Sair',
			confirmAccount: 'Confirmar Conta',
			name: 'Nome',
			namePlaceholder: 'O seu nome',
			email: 'Email',
			emailPlaceholder: 'O seu email',
			password: 'Password',
			passwordPlaceholder: 'A sua password',
			newPassword: 'Nova password',
			newPasswordPlaceholder: 'Inserir nova password',
			confirmPassword: 'Confirmar Password',
			confirmPasswordPlaceholder: 'Repetir a password',
			forgotPassword: 'Esqueceu-se da password?',
			loginFooter: 'Não tem conta?',
			registerFooter: 'Já tem conta? Autentique-se aqui.',
			resendCode1: 'Não recebeu o seu código de confirmação? ',
			resendCode2: 'Reenviar código de ativação',
			sendEmail: 'Enviar Email',
			recoverPassword: 'Recuperar password',
			changePassword: 'Mudar Password',
			changeEmail: 'Mudar Email',
			newEmail: 'Novo Email',
			newEmailConfirm: 'Confirmar Novo Email',
			repeatEmail: 'Repetir Email',
			currentEmail: 'Email Atual',
			currentPassword: 'Password Atual',
			emailSent: 'Email Enviado com Sucesso',
			repeatPassword: 'Repetir Password',
			rememberedPassword: 'Lembrou-se da password?',
			adminPassword: 'Password do Administrador',
			notLoggedIn: 'Necessita de estar autenticado para ter acesso a esta página',
			noMatchPassword: 'As passwords não coincidem',
			acceptSubtitle: 'Por favor insira uma password para confirmar a sua conta.',
			goBackToLogin: 'Ir para o ecrã de início de sessão',
			newAccount: 'Nova Conta',
			registeredSuccessfully: 'Conta registada com sucesso. Por favor verifique a sua caixa de email para confirmar a conta.',
			passwordChanged: 'Password alterada com sucesso.',
			accountConfirmed: 'Conta confirmada com sucesso.',
			typeCredentials: 'Insira o seu e-mail e password para entrar',
			loginConfirmAccount: 'Ainda não tem conta?',
			loginConfirmAccount2: 'Confirme a sua conta',
			insertEmail: 'Insira o seu e-mail para confirmar a sua conta',
			definePassword: 'Definir Password',
			definePassword2: 'Defina a sua password de acesso',
			acceptTerms: 'Ao confirmar a conta, aceita os',
			acceptTerms2: 'e a',
			acceptEmailContent: 'Aceito receber conteúdos por e-mail',
		},

		notFound: {
			header: 'Página Inexistente',
		},

		errors: {
			invalidArgs: 'Argumentos inválidos ou em falta',
			invalidFields: 'Campos inválidos ou em falta',
			emailIsInvalid: 'O formato de email inserido não é válido',
			fillEmail: 'Insira um email por favor',
			fillPassword: 'Insira uma password por favor',
			pleaseFillFormCorrectly: 'Por favor preencha o formulário correctamente',
			fillField: 'Este campo é de preenchimento obrigatório',
			notSupportedFile: 'Tipo de ficheiro não suportado',
			nameIsEmpty: 'O campo nome é de preenchimento obrigatório',
			passwordsDontMatch: 'Os campos \'Nova password\' e \'Confirmar password\' não coincidem',
			emailIsEmpty: 'O campo email é de preenchimento obrigatório',
			fileTooBigorInvalid: 'O tamanho da imagem é superior a 8MB ou tem um formato inválido',
			invalidFormat: 'Formato Inválido',
		},

		profile: {
			header: 'Perfil',
			generalInfo: 'Informação Geral',
			phone: 'Número de Telefone',
			removePicture: 'Remover Imagem',
			saved: 'Perfil guardado com sucesso.',
		},

		home: {
			nextAppointment: 'Próxima Consulta',
			noAppointments: 'Ainda não tem consultas agendadas',
			scheduledAppointments: 'Consultas Futuras',
			needChat: 'Precisa de falar com um dos nossos psicólogos?',
			startChat: 'Iniciar Chat',
			scheduleAppointment: 'Agende uma consulta',
			scheduleVideoAppointment: 'Agendar video-consulta',
			psychologicalAppointment: 'Consulta de Psicologia',
		},

		appointments: {
			header: 'Consultas',
			history: 'Histórico',
			cancel: 'Cancelar',
			confirm: 'Confirmar',
			reschedule: 'Reagendar',
			schedule: 'Agendar Consulta',
			noAppointments: 'Ainda não tem consultas agendadas',
			selectDate: 'Selecione a data',
			availableSlots: 'Horários disponíveis',
			cancelAppointment: 'Tem a certeza que quer cancelar a marcação?',
			replyMessage: 'Escreva algo aqui...',
		},

		chat: {
			header: 'Chat',
		},

		placeholders: {
			name: 'o seu nome',
			email: 'o_seu@email.com',
			phoneNumber: '+351265000000',
			language: 'Selecione uma língua',
			role: 'Selecione um cargo',
			currentPassword: 'password actual',
			newPassword: 'nova password',
			confirmPassword: 'confirme nova password',
			newEmail: 'novo@email.com',
			page: 'pagina',
			titlePage: 'Título da Página',
			link: 'https://www.google.com/',
			profilePic: 'Imagem de Perfil',
			password: 'a sua password',
		},

		serverErrors: {
			title: 'Erro de Servidor',
			subTitle: 'Não é você, somos nós!',
			refresh: 'Voltar à Página Anterior',
			backToHome: 'Ir para o Início',
			accountNotConfirmed: 'Conta não confirmada.',
			notFound: 'Conta não existente.',
			invalidCredentials: 'Conta não existe ou credenciais inválidas.',
			requestNotPossible: 'Não foi possível contactar com o servidor. Por favor, tente mais tarde.',
		},

		footer: {
			downloadOn: 'Download on the',
			appStore: 'App Store',
			getIt: 'Get it on',
			googlePlay: 'Google Play',
		},

		ranges: {
			today: "Hoje",
			thisMonth: "Este mês",
			lastMonth: "Último mês",
			thisYear: "Este ano",
			lastYear: "Último ano",
		},
	},

	/* cSpell.language:en */
	en: {
		// Generic
		generic: {
			profile: 'Profile',
			save: 'Save',
			confirm: 'Confirm',
			supportPlan: 'Employee psychological support plan',
			permit: 'Permit',
			noThankYou: 'No Thank You',
			receiveNotificationsDescription: 'We would like to show you push notifications about your appointments.',
			yes: 'Yes',
			no: 'No',
		},

		fields: {
			startDate: "Start Date",
			endDate: "End Date",
		},

		sidebar: {
			home: 'Home',
			appointments: 'Appointments',
			chat: 'Chat',
			profile: 'Profile',
			hello: 'Hello',
			terms: 'Terms and Conditions',
			privacy: 'Privacy Policy',
		},

		language: {
			header: 'Language',
			defaultLanguage: 'Default Language',
			languageNotActive: 'Save the changes before changing the default language.',
			portuguese: 'Portuguese',
			english: 'English',
			german: 'German',
			french: 'French',
			spanish: 'Spanish',
		},

		// Screens
		authentication: {
			welcome: 'Welcome',
			header: 'Authentication',
			register: 'Register',
			login: 'Login',
			logout: 'Logout',
			signIn: 'Sign in',
			signOut: 'Sign out',
			confirmAccount: 'Confirm Account',
			name: 'Name',
			namePlaceholder: 'Your name',
			email: 'Email',
			emailPlaceholder: 'Your email',
			password: 'Password',
			passwordPlaceholder: 'Your password',
			newPassword: 'New password',
			newPasswordPlaceholder: 'Enter new password',
			confirmPassword: 'Confirm Password',
			confirmPasswordPlaceholder: 'Repeat your password',
			forgotPassword: 'Forgot your password?',
			loginFooter: 'New account?',
			registerFooter: 'Do you have an account? Login here',
			resendCode1: 'Have you not received your confirmation code? ',
			resendCode2: 'Resend activation code',
			sendEmail: 'Send Email',
			recoverPassword: 'Recover Password',
			changePassword: 'Change Password',
			changeEmail: 'Change Email',
			newEmail: 'New Email',
			repeatEmail: 'Repeat Email',
			newEmailConfirm: 'Confirm New Email',
			currentEmail: 'Current Email',
			currentPassword: 'Current Password',
			emailSent: 'Email Sent Successfully',
			repeatPassword: 'Repeat Password',
			rememberedPassword: 'Did you remember your password?',
			adminPassword: 'Admin Password',
			notLoggedIn: 'You need to be logged in to access this page',
			noMatchPassword: 'Passwords don\'t match',
			acceptSubtitle: 'Please input a password to confirm your account.',
			goBackToLogin: 'Go to the login screen',
			newAccount: 'New account',
			registeredSuccessfully: 'Registration completed successfully. Please check your registered email for email verification.',
			passwordChanged: 'Password changed successfully.',
			accountConfirmed: 'Account confirmed successfully.',
			typeCredentials: 'Type your email and password to enter',
			loginConfirmAccount: 'No account yet?',
			loginConfirmAccount2: 'Confirm your account',
			insertEmail: 'Please type your e-mail to confirm your account',
			definePassword: 'Define Password',
			definePassword2: 'Define a password for your account',
			acceptTerms: 'When confirming your account, you\'re accepting',
			acceptTerms2: 'and',
			acceptEmailContent: 'I accept to subscribe to e-mail content',
		},

		notFound: {
			header: 'Not Found',
		},

		errors: {
			invalidArgs: 'Invalid or missing arguments',
			invalidFields: 'Invalid or missing fields',
			emailIsInvalid: 'Email format is not valid',
			fillEmail: 'Please input your email',
			fillPassword: 'Please input your password',
			pleaseFillFormCorrectly: 'Please fill the form correctly',
			fillField: 'This field is mandatory',
			notSupportedFile: 'File type not supported',
			nameIsEmpty: 'Please fill name field',
			passwordsDontMatch: 'Fields \'New password\' and \'Confirm password\' don\'t match',
			emailIsEmpty: 'Please fill email field',
			fileTooBigorInvalid: 'File size is larger than 8MB or file is corrupt',
			invalidFormat: 'Invalid Format',
		},

		profile: {
			header: 'Profile',
			generalInfo: 'General Information',
			phone: 'Phone Number',
			removePicture: 'Remove Picture',
			saved: 'Profile has been saved sucessfully.',
		},

		home: {
			nextAppointment: 'Next Appointment',
			noAppointments: 'You have no scheduled appointments',
			scheduledAppointments: 'Scheduled Appointments',
			needChat: 'Do you need to talk to one of our psychologists?',
			startChat: 'Start Chat',
			scheduleAppointment: 'Schedule an appointment',
			scheduleVideoAppointment: 'Schedule remote consultation',
			psychologicalAppointment: 'Psychology Consultation',
		},

		appointments: {
			header: 'Appointments',
			history: 'History',
			cancel: 'Cancel',
			confirm: 'Confirm',
			reschedule: 'Reschedule',
			schedule: 'Schedule Appointment',
			noAppointments: 'You have no scheduled appointments',
			selectDate: 'Select a date',
			availableSlots: 'Available hours',
			cancelAppointment: 'Are you sure you want to cancel this appointment?',
			replyMessage: 'Type something here...',
		},

		chat: {
			header: 'Chat',
		},

		placeholders: {
			name: 'your name',
			email: 'your@email.com',
			phoneNumber: '+351265000000',
			language: 'Select a language option',
			role: 'Select a role',
			currentPassword: 'actual password',
			newPassword: 'new password',
			confirmPassword: 'confirm new password',
			newEmail: 'new@email.com',
			page: 'page',
			titlePage: 'Page Title',
			link: 'https://www.google.com/',
			profilePic: 'Profile Picture',
			password: 'your password',
		},

		serverErrors: {
			title: 'Internal Server Error',
			subTitle: 'It\'s not you, it\'s us!',
			refresh: 'Go Back to Previous Page',
			backToHome: 'Go to Home',
			accountNotConfirmed: 'Account not confirmed.',
			notFound: 'Account does not exist.',
			invalidCredentials: 'Account does not exist or credentials are invalid.',
			requestNotPossible: 'Connection to the server was not established. Please try again later.',
		},

		footer: {
			downloadOn: 'Download on the',
			appStore: 'App Store',
			getIt: 'Get it on',
			googlePlay: 'Google Play',
		},

		ranges: {
			today: "Today",
			thisMonth: "This month",
			lastMonth: "Last month",
			thisYear: "This year",
			lastYear: "Last year",
		},
	},
});
