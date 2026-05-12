export default function Hero({
  title,
  subtitle,
  buttonText,
}) {
  return (
    <section className="py-20 text-center">
      <h1 className="text-5xl font-bold">
        {title}
      </h1>

      <p className="mt-4 text-gray-600">
        {subtitle}
      </p>

      <button className="mt-6 px-6 py-3 bg-black text-white rounded">
        {buttonText}
      </button>
    </section>
  );
}