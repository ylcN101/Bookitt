import { BsTelephoneFill, BsFillPersonFill } from 'react-icons/bs';
import { CgSpinner } from 'react-icons/cg';
import { useLogin } from '../hooks/useLogin';
import OtpInput from 'otp-input-react';
import { useEffect, useState } from 'react';
import 'react-phone-input-2/lib/style.css';
import { auth } from '../firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { toast, Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const LoginPhone = () => {
  const { t } = useTranslation(['login']);
  const { loginMutation } = useLogin();
  const [otp, setOtp] = useState('');
  const [ph, setPh] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  const onCaptchVerify = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback: function () {
          console.log('Captcha Resolved');
        },
        defaultCountry: 'IL',
      },
      auth
    );

    window.recaptchaVerifier.render().then(widgetId => {
      window.recaptchaWidgetId = widgetId;
    });
  };

  const onSignup = () => {
    setLoading(true);
    onCaptchVerify();
    const appVerifier = window.recaptchaVerifier;
    const formatPh = `+972${ph.slice(1)}`;
    const length = formatPh.length;
    if (length < 10) {
      setLoading(false);
      toast.error(t('Something went wrong!'));
      refreshCaptcha();
      return;
    }
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then(confirmationResult => {
        window.confirmationResult = confirmationResult;
        setLoading(false);
        setShowOTP(true);
        toast.success(t('OTP sended successfully!'));
      })
      .catch(error => {
        setError(true);
        toast.error(t('Something went wrong!'));
        refreshCaptcha();
        console.log(error);
        setLoading(false);
      });
  };

  const onOTPVerify = () => {
    setLoading(true);
    const code = otp;
    window.confirmationResult
      .confirm(code)
      .then(result => {
        const user = result.user;
        setUser(user);
        const data = {
          phone: user.phoneNumber,
          name,
          uid: user.uid,
        };
        loginMutation.mutate(data);
        setLoading(false);
        toast.success(t('OTP verified successfully!'));
      })
      .catch(error => {
        toast.error(t('OTP verification failed!'));
        refreshCaptcha();
        setError(true);
        console.log(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (otp.length === 6) {
      onOTPVerify();
    }
  }, [otp]);

  const refreshCaptcha = () => {
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <>
      <header className="bg-white flex justify-between items-center px-4 py-2 shadow-md h-16">
        <Link to="/" className="text-2xl font-bold text-gray-800">
          Bookit
        </Link>
      </header>

      <section className="bg-gray-100 h-[93vh] flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center pb-20">
          <Toaster toastOptions={{ duration: 4000 }} />
          <div id="recaptcha-container"></div>
          {showOTP ? (
            <>
              <h2 className=" text-3xl font-bold text-gray-800 text-center">
                {t('Enter the SMS code')}
              </h2>

              <OtpInput
                value={otp}
                onChange={setOtp}
                OTPLength={6}
                otpType="number"
                renderSeparator={<span>-</span>}
                shouldAutoFocus={true}
                autoFocus={true}
                className="opt-container p-8"
              ></OtpInput>
              <button
                onClick={onOTPVerify}
                className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#546CC9] focus:outline-none focus:ring-2 focus:ring-offset-2 "
              >
                {loading && (
                  <CgSpinner size={20} className="mt-1 animate-spin" />
                )}
                <span>{t('Verify OTP')}</span>
              </button>
            </>
          ) : (
            <>
              <div className="bg-white px-12 pt-6 pb-24 shadow-2xl rounded-lg">
                <div className="mb-4">
                  <h2 className=" text-3xl font-bold text-gray-800 text-center">
                    {t('Sign in')}
                  </h2>
                </div>
                <div className="space-y-6">
                  <div>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                        <BsTelephoneFill size={20} className="text-gray-400" />
                      </div>
                      <input
                        id="phone"
                        placeholder={t('Enter your phone')}
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        required
                        value={ph}
                        onChange={e => setPh(e.target.value)}
                        className=" appearance-none block w-full px-12 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <BsFillPersonFill size={20} className="text-gray-400" />
                    </div>

                    <input
                      id="name"
                      placeholder={t('Enter your name')}
                      value={name}
                      onChange={e => setName(e.target.value)}
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      className=" appearance-none block w-full px-12 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none   sm:text-sm"
                    />
                  </div>
                  <button
                    onClick={onSignup}
                    className="bg-[#546CC9] w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                  >
                    {loading && (
                      <CgSpinner size={20} className="mt-1 animate-spin" />
                    )}

                    <span>{t('Login')}</span>
                  </button>
                  {error && (
                    <p className="text-red-500 text-sm text-center">
                      {t('verify')}
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default LoginPhone;
