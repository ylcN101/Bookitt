import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTranslation } from 'react-i18next';
import { meetingsService } from '../services/meetings.service';

interface User {
  name: string;
  email: string;
  phone: string;
}

interface UserInfo {
  userName: string;
  userEmail: string;
}

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation(['profile']);
  const { userId } = useParams<{ userId: string }>();

  const { data: user } = useQuery<User, Error>(
    ['user', userId],
    () => meetingsService.getUser(userId!),
    {
      onSuccess: data => {
        setUserInfo({
          userName: data.name,
          userEmail: data.email,
        });
      },
    }
  );

  const [userInfo, setUserInfo] = useState<UserInfo>({
    userName: '',
    userEmail: '',
  });

  const { userName: name, userEmail: email } = userInfo;

  const editUserMutation = useMutation<void, Error, UserInfo>(
    () => meetingsService.editUser(userId!, { name, email }),
    {
      onSuccess: () => {
        navigate(`/`);
      },
    }
  );

  const handleEditUser = () => {
    if (!name) {
      return;
    }
    editUserMutation.mutate(userInfo);
  };

  return (
    <>
      <ToastContainer />
      <section className="py-10 bg-gray-100  font-bold text-[#3C3744] bg-opacity-50 h-[90vh] md:pt-20">
        <h1 className="text-3xl text-center mb-10">{t('edit-account')}</h1>
        <div className="mx-auto container max-w-2xl ">
          <div className="space-y-6">
            <div className="md:inline-flex space-y-4 md:space-y-0 w-full p-4 text-gray-500 items-center">
              <h2 className="md:w-1/3 max-w-sm mx-auto">{t('account')}</h2>
              <div className="md:w-2/3 max-w-sm mx-auto">
                <label className="text-sm text-gray-400">{t('email')}</label>
                <div className="w-full inline-flex border">
                  <div className="pt-2 w-1/12 bg-gray-100 bg-opacity-50">
                    <svg
                      fill="none"
                      className="w-6 text-gray-400 mx-auto"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <input
                    type="email"
                    className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                    value={userInfo.userEmail}
                    onChange={e => {
                      setUserInfo({ ...userInfo, userEmail: e.target.value });
                    }}
                  />
                </div>
              </div>
            </div>

            <hr />
            <div className="md:inline-flex  space-y-4 md:space-y-0  w-full p-4 text-gray-500 items-center">
              <h2 className="md:w-1/3 mx-auto max-w-sm">
                {t('personal-info')}
              </h2>
              <div className="md:w-2/3 mx-auto max-w-sm space-y-5">
                <div>
                  <label className="text-sm text-gray-400">
                    {t('full-name')}
                  </label>
                  <div className="w-full inline-flex border">
                    <div className="w-1/12 pt-2 bg-gray-100">
                      <svg
                        fill="none"
                        className="w-6 text-gray-400 mx-auto"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <input
                      type="text"
                      className="w-11/12 focus:outline-none focus:text-gray-600 p-2"
                      value={userInfo.userName}
                      onChange={e => {
                        console.log(e.target.value);
                        setUserInfo({ ...userInfo, userName: e.target.value });
                      }}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm text-gray-400">
                    {t('phone-number')}
                  </label>
                  <div className="w-full inline-flex border">
                    <div className="pt-2 w-1/12 bg-gray-300">
                      <svg
                        fill="none"
                        className="w-6 text-gray-400 mx-auto"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <input
                      disabled
                      type="text"
                      className="bg-gray-300 w-full p-2"
                      defaultValue={user?.phone}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center pb-0.5 text-center md:py-10">
              <button
                onClick={handleEditUser}
                className="flex items-center justify-center text-white bg-[#546CC9] rounded-full w-[19em] py-[11px] transition duration-300 ease-in-out shadow-md"
              >
                <svg
                  fill="none"
                  className="w-4 text-white mr-2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                {t('update')}
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
