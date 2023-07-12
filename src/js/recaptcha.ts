const RECAPTCHA_SITE_KEY = "6LcT-UEfAAAAALIl7NO1JPZvYuvVxDF6kyzYc1gH";

export async function addRecaptchaToFormData(
  formData: FormData,
  formName: string,
) {
  const token = await grecaptcha.execute(RECAPTCHA_SITE_KEY, {
    action: `submit_${formName}`,
  });

  formData.append("g-recaptcha-response", token);
}
