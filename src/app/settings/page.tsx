'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { NavigationBar } from '@/components/common/NavigationBar';

export default function SettingsPage() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: '#141414',
    color: '#a5a5a7',
  };

  const contentStyle: React.CSSProperties = {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '60px 20px',
  };

  const sectionStyle: React.CSSProperties = {
    marginBottom: '60px',
  };

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '13px',
    fontWeight: '400',
    color: '#686869',
    marginBottom: '20px',
    letterSpacing: '0.5px',
  };

  const cardStyle: React.CSSProperties = {
    background: '#1c1c1e',
    borderRadius: '8px',
    overflow: 'hidden',
  };

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 24px',
    borderBottom: '1px solid #2c2c2e',
    cursor: 'pointer',
    transition: 'background 0.2s',
  };

  const lastRowStyle: React.CSSProperties = {
    ...rowStyle,
    borderBottom: 'none',
  };

  const leftContentStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  };

  const mainTextStyle: React.CSSProperties = {
    fontSize: '15px',
    color: '#ffffff',
    fontWeight: '400',
  };

  const subTextStyle: React.CSSProperties = {
    fontSize: '13px',
    color: '#686869',
    fontWeight: '400',
  };

  const arrowStyle: React.CSSProperties = {
    fontSize: '14px',
    color: '#686869',
  };

  const emailVerifiedStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '13px',
    color: '#FF0558',
    fontWeight: '400',
  };

  const dangerTextStyle: React.CSSProperties = {
    fontSize: '15px',
    color: '#ff4444',
    fontWeight: '400',
  };

  const handleDeleteAccount = () => {
    if (confirm('정말로 탈퇴하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
      logout();
      router.push('/');
    }
  };

  return (
    <div style={containerStyle}>
      <NavigationBar />
      <div style={contentStyle}>
        {/* 계정 섹션 */}
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>계정</h2>
          <div style={cardStyle}>
            <div
              style={rowStyle}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#242426')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <div style={leftContentStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={mainTextStyle}>{user?.email || 'ahdosj@gmail.com'}</span>
                  <span style={emailVerifiedStyle}>
                    <span style={{ color: '#FF0558', fontSize: '10px' }}>●</span>
                    인증하기
                  </span>
                </div>
                <span style={subTextStyle}>
                  인증되지 않으면 결제 등 제한된 기능을 놓칠 수 있어요
                </span>
              </div>
              <span style={arrowStyle}>›</span>
            </div>

            <div
              style={rowStyle}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#242426')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <span style={mainTextStyle}>이메일 변경</span>
              <span style={arrowStyle}>›</span>
            </div>

            <div
              style={lastRowStyle}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#242426')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <span style={mainTextStyle}>비밀번호 변경</span>
              <span style={arrowStyle}>›</span>
            </div>
          </div>
        </div>

        {/* 성인 인증 섹션 */}
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>설정</h2>
          <div style={cardStyle}>
            <div
              style={rowStyle}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#242426')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <span style={mainTextStyle}>성인 인증</span>
              <span style={arrowStyle}>›</span>
            </div>

            <div
              style={rowStyle}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#242426')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <span style={mainTextStyle}>공개 범위 설정</span>
              <span style={arrowStyle}>›</span>
            </div>

            <div
              style={lastRowStyle}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#242426')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <span style={mainTextStyle}>프로필 연령 등급 설정</span>
              <span style={arrowStyle}>›</span>
            </div>
          </div>
        </div>

        {/* 회원 탈퇴 섹션 */}
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>회원 탈퇴</h2>
          <div style={cardStyle}>
            <div
              style={lastRowStyle}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#242426')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              onClick={handleDeleteAccount}
            >
              <span style={dangerTextStyle}>탈퇴하기</span>
              <span style={arrowStyle}>›</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
