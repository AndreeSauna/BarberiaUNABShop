import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Footer() {
  return (
    <footer className="bg-zinc-700 py-5 px-4 sm:px-10 rounded-lg mt-auto">
      <div className="container mx-auto text-center">
        <p className="text-sm text-zinc-400">
          <i className="fas fa-copyright"></i> Copyright 2024 | Todos los derechos reservados | Desarrollado por Andree Sauna
        </p>
        <p className="text-xs text-zinc-500 mt-2">
          Este sitio está destinado a consumidores chilenos. Las cookies y la tecnología relacionada se utilizan con fines publicitarios. Para obtener más información, visite AdChoices y nuestra política de privacidad.
        </p>
      </div>
    </footer>
  );
}
