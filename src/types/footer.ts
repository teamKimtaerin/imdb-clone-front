export interface FooterProps {
  /** 팀/회사 이름 */
  teamName?: string;
  /** GitHub URL */
  githubUrl?: string;
  /** 저작권 연도 */
  copyrightYear?: number;
  /** 추가 설명 텍스트 */
  description?: string;
  /** 커스텀 스타일 */
  style?: React.CSSProperties;
}
