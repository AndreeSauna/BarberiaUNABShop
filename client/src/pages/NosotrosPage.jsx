import image from "../assets/image";

function NosotrosPage() {
    return (
        <div className="container mx-auto px-4 py-8 text-center">
            <div className="text-lg text-zinc-600 mb-4">
                <img src={image} alt="Barbería" className="mx-auto mb-4 w-32 h-32 object-cover rounded-full" />
                <h1 className="text-3xl font-bold mb-2">Nosotros</h1>
            </div>
            <p className="text-base text-zinc-700 mb-4">
                En UNAB BARBER, creemos que un corte de cabello es mucho más que una simple transformación estética; es una experiencia personal que refleja tu estilo, tu identidad y tu confianza. Nuestro propósito no es solo ofrecer un servicio de calidad, sino crear un espacio donde cada cliente se sienta valorado y comprendido.
            </p>
            <p className="text-base text-zinc-700 mb-4">
                <strong>¿Por qué decidimos establecer una barbería?</strong>
                <br />
                Desde el primer día, nuestra visión ha sido crear un refugio urbano donde el arte del cuidado personal se encuentre con la tradición y la modernidad. Fundada por un grupo de apasionados por el estilo y el diseño, UNAB BARBER nace de la idea de ofrecer algo más que un simple corte. Queríamos construir un lugar donde cada detalle cuenta, donde el ambiente acogedor y el toque profesional se combinan para brindar una experiencia única.
            </p>
            <p className="text-base text-zinc-700 mb-4">
                Nuestra barbería es un homenaje a la cultura clásica de los barberos, con un enfoque fresco y contemporáneo. Cada uno de nuestros barberos es un artista en su oficio, entrenado en las técnicas tradicionales y a la vez actualizado con las últimas tendencias. Pero lo que realmente nos distingue es nuestro compromiso con la excelencia y la atención personalizada.
            </p>
            <p className="text-base text-zinc-700 mb-4">
                Creemos que cada visita es una oportunidad para conectar con nuestros clientes a un nivel más profundo, entender sus deseos y ayudarles a expresar su personalidad a través de su estilo. En UNAB BARBER, no solo te ofrecemos cortes y arreglos; te invitamos a ser parte de una comunidad que celebra la individualidad y el buen gusto.
            </p>
            <p className="text-base text-zinc-700 mb-4">
                <strong>Nuestra Misión</strong>
                <br />
                Queremos ser el lugar al que llegues no solo para un corte de cabello, sino para disfrutar de una experiencia que te haga sentir bien contigo mismo. Nuestro objetivo es superar tus expectativas, cada vez que cruzas nuestras puertas.
            </p>
            <p className="text-base text-zinc-700">
                Ven a conocernos y descubre por qué UNAB BARBER es mucho más que una barbería; es una experiencia, una comunidad, un estilo de vida.
            </p>
        </div>
    );
}

export default NosotrosPage;
