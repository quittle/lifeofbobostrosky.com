// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).onSubmit = function onSubmit(_token: string): void {
  const form = document.getElementById("contact-form") as HTMLFormElement;
  form.submit();
};
