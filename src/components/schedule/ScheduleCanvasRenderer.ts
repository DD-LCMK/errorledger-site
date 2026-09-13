/**
 * ScheduleCanvasRenderer — Renders High-Res Airline Boarding Pass / Travel Ticket Broadcast PNG for Streamers
 * 
 * Accurately reproduces the vintage travel ticket & hotel keychain aesthetic:
 * 1. Top Section: Vintage Hotel Keychain ("SCHEDULE") with silver key + Flight Board ("DEP ✈ ARR") + MON Ticket
 * 2. Middle Row: TUE, WED, THU 3-Ticket Perforated Boarding Pass with Barcode Stub
 * 3. Bottom Row: FRI, SAT, SUN 3-Ticket Boarding Pass with Hanging "OFFLINE" Rustic Sign on Day Off
 * 4. Monthly View: Travel Passport / Calendar Grid View
 * 
 * 100% Client-side HTML5 Canvas drawing, zero external dependencies.
 */

import { SCHEDULE_THEMES, STATUS_BADGES, formatDisplayTime, type StreamScheduleData, type DayScheduleEntry } from './scheduleTemplates';

export interface WeekDaySlice {
  year: number;
  month: number;
  day: number;
  dayEn: string;
  dayKo: string;
  isCurrentMonth: boolean;
  dateStr: string;
  entry: DayScheduleEntry;
}

export function renderScheduleToCanvas(
  canvas: HTMLCanvasElement,
  data: StreamScheduleData,
  weekSlice: WeekDaySlice[],
  isWeeklyMode: boolean = true,
  scale: number = 2
): void {
  const width = isWeeklyMode ? 940 : 1600;
  const height = isWeeklyMode ? 900 : 940;
  canvas.width = width * (scale / 2);
  canvas.height = height * (scale / 2);

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const currentScale = scale / 2;
  ctx.scale(currentScale, currentScale);

  const isBoardingPassTheme = (data.themeId === 'travel-boarding-pass');
  const theme = SCHEDULE_THEMES[data.themeId] || SCHEDULE_THEMES['travel-boarding-pass'];

  // 1. Desk / Board Background
  ctx.fillStyle = theme.bg || '#d2d7e2';
  ctx.fillRect(0, 0, width, height);

  // Subtle paper/canvas vignette
  const vignette = ctx.createRadialGradient(width / 2, height / 2, 100, width / 2, height / 2, width / 1.1);
  vignette.addColorStop(0, 'rgba(255, 255, 255, 0.25)');
  vignette.addColorStop(1, 'rgba(30, 40, 60, 0.15)');
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, width, height);

  if (isWeeklyMode) {
    renderBoardingPassWeeklyCanvas(ctx, data, weekSlice, theme, width, height);
  } else {
    renderBoardingPassMonthlyCanvas(ctx, data, theme, width, height);
  }

  // Footer Branding
  ctx.textAlign = 'center';
  ctx.font = '11px "Pretendard", sans-serif';
  ctx.fillStyle = isBoardingPassTheme ? 'rgba(40, 60, 95, 0.5)' : 'rgba(255, 255, 255, 0.4)';
  ctx.fillText('Created with StreamArcade Boarding Pass Studio (streamarcade.net)', width / 2, height - 14);
}

/**
 * Renders the exact vintage boarding pass design on canvas:
 * Top: Keychain + Flight DEP/ARR + MON
 * Mid: TUE, WED, THU
 * Btm: FRI, SAT, SUN
 */
function renderBoardingPassWeeklyCanvas(
  ctx: CanvasRenderingContext2D,
  data: StreamScheduleData,
  weekSlice: WeekDaySlice[],
  theme: any,
  width: number,
  height: number
): void {
  const padX = 36;
  const topY = 32;
  const boardW = width - padX * 2;

  // ─────────────────────────────────────────────────────────────────────────────
  // 1. TOP SECTION (Height: 240px)
  // Left: Hotel Keychain + Flight Gate Display + Channel Profile
  // Right: MON Ticket
  // ─────────────────────────────────────────────────────────────────────────────
  const topSecH = 240;
  const monTicketW = 245;
  const leftHeaderW = boardW - monTicketW - 18;

  // 1A. Vintage Hotel Key Tag ("SCHEDULE")
  const tagX = padX + 15;
  const tagY = topY + 18;
  const tagW = 270;
  const tagH = 92;

  ctx.save();
  // Drop shadow
  ctx.shadowColor = 'rgba(25, 38, 62, 0.28)';
  ctx.shadowBlur = 14;
  ctx.shadowOffsetX = 3;
  ctx.shadowOffsetY = 6;

  // Key tag pill body
  ctx.fillStyle = theme.keytagBg || '#5570a5';
  roundRect(ctx, tagX, tagY, tagW, tagH, 46, true, false);

  // Reset shadow
  ctx.restore();

  // Key tag inner bevel stroke
  ctx.strokeStyle = theme.keytagBorder || '#7c9bd1';
  ctx.lineWidth = 1.5;
  roundRect(ctx, tagX + 7, tagY + 7, tagW - 14, tagH - 14, 39, false, true);

  // Key tag hole
  ctx.fillStyle = '#111827';
  ctx.beginPath();
  ctx.arc(tagX + 28, tagY + tagH / 2, 7, 0, Math.PI * 2);
  ctx.fill();

  // Title text (e.g. "SCHEDULE", "CHZZK LIVE", "TWITCH LIVE", etc.)
  const keyTitle = theme.keytagTitle || 'SCHEDULE';
  ctx.textAlign = 'center';
  ctx.font = '900 24px "Georgia", "Times New Roman", serif';
  ctx.fillStyle = theme.keytagShadow || '#9cb6e5';
  ctx.fillText(keyTitle, tagX + tagW / 2 + 10, tagY + tagH / 2 + 10);
  ctx.fillStyle = theme.keytagText || '#1e2c47';
  ctx.fillText(keyTitle, tagX + tagW / 2 + 10, tagY + tagH / 2 + 8);

  // Metal Key Ring (Silver loop through hole)
  ctx.strokeStyle = '#b4bfd1';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.arc(tagX + 24, tagY + tagH / 2 - 4, 16, 0, Math.PI * 2);
  ctx.stroke();

  // Silver Key laid across
  drawSilverKey(ctx, tagX + 15, tagY + tagH / 2 + 4, 105);

  // 1B. Flight Departure / Arrival Gate Display ("DEP ✈ ARR")
  const gateX = tagX + tagW + 16;
  const gateY = topY + 48;
  const gateW = 240;
  const gateH = 68;

  // Box shadow
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.18)';
  ctx.shadowBlur = 8;
  ctx.shadowOffsetY = 3;
  ctx.fillStyle = theme.tickerBg || '#cfe4f5';
  ctx.strokeStyle = theme.tickerBorder || '#8ab6db';
  ctx.lineWidth = 1.5;
  roundRect(ctx, gateX, gateY, gateW, gateH, 10, true, true);
  ctx.restore();

  // Header: DEP ✈ ARR
  ctx.textAlign = 'center';
  ctx.font = 'bold 12px "Pretendard", sans-serif';
  ctx.fillStyle = theme.tickerLabel || '#416b8c';
  ctx.fillText('DEP    ✈    ARR', gateX + gateW / 2, gateY + 24);

  // Dates: 09.14 ✈ 09.20
  const depStr = weekSlice[0]?.dateStr || '09.14';
  const arrStr = weekSlice[6]?.dateStr || '09.20';
  ctx.font = 'bold 18px "Courier New", monospace, sans-serif';
  ctx.fillStyle = theme.tickerText || '#23445e';
  ctx.fillText(`${depStr}  ✈  ${arrStr}`, gateX + gateW / 2, gateY + 50);

  // Channel Stamp Info under keychain
  ctx.textAlign = 'left';
  ctx.font = 'bold 14px "Pretendard", sans-serif';
  ctx.fillStyle = theme.textSub || '#344b75';
  ctx.fillText(`✈ [${data.channel.platform.toUpperCase()}] ${data.channel.name || '스트리머 채널'} • ${data.channel.tagline || '주간 방송'}`, padX + 22, topY + 165);

  // 1C. MON Ticket Stub (Top Right)
  const monX = boardW + padX - monTicketW;
  const monY = topY;
  const monDay = weekSlice[0] || { dayEn: 'MON', dayKo: '월', dateStr: '09.14', entry: { title: '저챗 / 소통', memo: '한 주 시작 토크', time: '20:00 ~ 23:00', status: 'chat' } };
  drawSingleTicketCell(ctx, monX, monY, monTicketW, topSecH, monDay, theme.ribbonBg, theme, true);

  // ─────────────────────────────────────────────────────────────────────────────
  // 2. MIDDLE ROW (TUE, WED, THU) (Height: 250px)
  // Perforated 3-Ticket Sheet with Left Barcode Stub
  // ─────────────────────────────────────────────────────────────────────────────
  const midY = topY + topSecH + 16;
  const rowH = 250;
  drawTicketRowSheet(ctx, padX, midY, boardW, rowH, [weekSlice[1], weekSlice[2], weekSlice[3]], theme);

  // ─────────────────────────────────────────────────────────────────────────────
  // 3. BOTTOM ROW (FRI, SAT, SUN) (Height: 250px)
  // Perforated 3-Ticket Sheet with Left Barcode Stub
  // ─────────────────────────────────────────────────────────────────────────────
  const btmY = midY + rowH + 16;
  drawTicketRowSheet(ctx, padX, btmY, boardW, rowH, [weekSlice[4], weekSlice[5], weekSlice[6]], theme);
}

/**
 * Draws a 3-ticket perforated sheet (TUE-WED-THU or FRI-SAT-SUN)
 */
function drawTicketRowSheet(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  days: (WeekDaySlice | undefined)[],
  theme: any
): void {
  // Shadow
  ctx.save();
  ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
  ctx.shadowBlur = 12;
  ctx.shadowOffsetY = 4;

  // Sheet Background
  ctx.fillStyle = theme.stripBg || '#f8fafc';
  roundRect(ctx, x, y, w, h, 14, true, false);
  ctx.restore();

  // Sheet Outer Border
  ctx.strokeStyle = theme.stripBorder || '#b2c4e5';
  ctx.lineWidth = 1.5;
  roundRect(ctx, x, y, w, h, 14, false, true);

  // Left Barcode Stub (Width ~58px)
  const stubW = 56;
  ctx.fillStyle = theme.stubBg || 'rgba(240, 244, 252, 0.8)';
  roundRect(ctx, x, y, stubW, h, 14, true, false);

  // Dashed separator after barcode stub
  ctx.strokeStyle = theme.stubBorder || '#b2c4e5';
  ctx.lineWidth = 1.5;
  drawDashedLine(ctx, x + stubW, y + 10, x + stubW, y + h - 10, [4, 4]);

  // Semicircle cutouts on stub separator
  drawPerforationHole(ctx, x + stubW, y, 9, theme);
  drawPerforationHole(ctx, x + stubW, y + h, 9, theme);

  // Vertical Barcode Graphic & Serial Code
  ctx.save();
  ctx.translate(x + stubW / 2 - 4, y + h / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.textAlign = 'center';
  ctx.font = '10px monospace';
  ctx.fillStyle = theme.barcodeColor || '#486391';
  ctx.fillText('|||||| |||| ||||| ||||||| |||||', 0, -4);
  ctx.font = 'bold 9px monospace';
  ctx.fillStyle = theme.stubText || '#6a84b0';
  ctx.fillText('01223541354121021', 0, 8);
  ctx.restore();

  // 3 Ticket Columns
  const ticketsAreaW = w - stubW;
  const colW = ticketsAreaW / 3;

  days.forEach((dayData, i) => {
    const colX = x + stubW + i * colW;
    const ribbonColor = (i === 2 && dayData?.dayEn === 'SUN' && theme.accent) ? theme.accent : theme.ribbonBg;

    drawSingleTicketContent(ctx, colX, y, colW, h, dayData, ribbonColor, theme);

    // Perforation divider between tickets (except last)
    if (i < 2) {
      const divX = colX + colW;
      ctx.strokeStyle = theme.stripBorder || '#b2c4e5';
      ctx.lineWidth = 1.2;
      drawDashedLine(ctx, divX, y + 10, divX, y + h - 10, [4, 4]);
      drawPerforationHole(ctx, divX, y, 8, theme);
      drawPerforationHole(ctx, divX, y + h, 8, theme);
    }
  });
}

/**
 * Draws a single ticket cell (e.g. MON, or inside column)
 */
function drawSingleTicketCell(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  dayData: WeekDaySlice | undefined,
  ribbonColor: string,
  theme: any,
  drawBoxShadow: boolean = false
): void {
  if (drawBoxShadow) {
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 4;
    ctx.fillStyle = theme.ticketBg || '#f8fafc';
    roundRect(ctx, x, y, w, h, 14, true, false);
    ctx.restore();

    ctx.strokeStyle = theme.stripBorder || '#b2c4e5';
    ctx.lineWidth = 1.5;
    roundRect(ctx, x, y, w, h, 14, false, true);
  }

  drawSingleTicketContent(ctx, x, y, w, h, dayData, ribbonColor, theme);
}

/**
 * Draws the inner content of a ticket: Ribbon, Title, Memo, Time, Flourish, or OFFLINE sign
 */
function drawSingleTicketContent(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  dayData: WeekDaySlice | undefined,
  ribbonColor: string,
  theme: any
): void {
  const d = dayData || { dayEn: 'DAY', dayKo: '일', dateStr: '00.00', entry: { title: '', memo: '', time: '', status: 'live' } };
  const entry = d.entry || { title: '', memo: '', time: '', status: 'live' };
  const isOff = entry.status === 'off' || entry.title === 'OFFLINE';

  // Inner fine decorative frame
  const pad = 10;
  ctx.strokeStyle = theme.ticketInnerBorder || '#c4d4f0';
  ctx.lineWidth = 1;
  roundRect(ctx, x + pad, y + pad, w - pad * 2, h - pad * 2, 8, false, true);

  // 1. Folded Ribbon Banner with Day Name (e.g. "MON", "TUE")
  const ribbonW = w - 46;
  const ribbonH = 34;
  const ribbonX = x + (w - ribbonW) / 2;
  const ribbonY = y + 16;

  // Ribbon folded tails
  ctx.fillStyle = theme.ribbonFold || '#4967a8';
  drawTriangle(ctx, ribbonX - 5, ribbonY + 6, ribbonX, ribbonY, ribbonX, ribbonY + ribbonH);
  drawTriangle(ctx, ribbonX + ribbonW + 5, ribbonY + 6, ribbonX + ribbonW, ribbonY, ribbonX + ribbonW, ribbonY + ribbonH);

  // Main Ribbon Body
  ctx.fillStyle = ribbonColor || theme.ribbonBg || '#5b7bc3';
  roundRect(ctx, ribbonX, ribbonY, ribbonW, ribbonH, 6, true, false);

  // Ribbon Text
  ctx.textAlign = 'center';
  ctx.font = '900 16px "Pretendard", "Segoe UI", sans-serif';
  ctx.fillStyle = theme.ribbonText || '#ffffff';
  ctx.fillText(d.dayEn, ribbonX + ribbonW / 2, ribbonY + 23);

  // 2. Content or Hanging OFFLINE Sign
  if (isOff) {
    // Hanging OFFLINE Sign
    const signW = w - 54;
    const signH = 72;
    const signX = x + (w - signW) / 2;
    const signY = y + 90;

    // Strings from ribbon to sign
    ctx.strokeStyle = theme.ticketInnerBorder || '#859cb8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(x + w / 2, ribbonY + ribbonH + 4);
    ctx.lineTo(signX + 20, signY);
    ctx.moveTo(x + w / 2, ribbonY + ribbonH + 4);
    ctx.lineTo(signX + signW - 20, signY);
    ctx.stroke();

    ctx.save();
    ctx.translate(signX + signW / 2, signY + signH / 2);
    ctx.rotate(-0.06);

    // Sign body
    ctx.fillStyle = theme.offlineBg || '#cbd2dc';
    ctx.strokeStyle = theme.offlineBorder || '#7c8fa8';
    ctx.lineWidth = 2;
    roundRect(ctx, -signW / 2, -signH / 2, signW, signH, 6, true, true);

    // Screws in corners
    drawScrew(ctx, -signW / 2 + 7, -signH / 2 + 7);
    drawScrew(ctx, signW / 2 - 7, -signH / 2 + 7);
    drawScrew(ctx, -signW / 2 + 7, signH / 2 - 7);
    drawScrew(ctx, signW / 2 - 7, signH / 2 - 7);

    // OFFLINE text
    ctx.textAlign = 'center';
    ctx.font = '900 21px "Arial Black", "Impact", sans-serif';
    ctx.fillStyle = theme.offlineText || '#4c5d75';
    ctx.fillText('OFFLINE', 0, 7);

    ctx.restore();
  } else {
    // Normal Broadcast Day: Title, Subtitle, Time
    const contentCenterY = y + 116;

    // Title
    ctx.textAlign = 'center';
    ctx.font = 'bold 18px "Pretendard", sans-serif';
    ctx.fillStyle = theme.ticketTitle || '#0f172a';
    ctx.fillText(entry.title || '방송 예정', x + w / 2, contentCenterY);

    // Subtitle / Memo
    ctx.font = '13px "Pretendard", sans-serif';
    ctx.fillStyle = theme.ticketMemo || '#334155';
    ctx.fillText(entry.memo || '', x + w / 2, contentCenterY + 28);

    // Time
    const displayTime = formatDisplayTime(entry) || entry.time || '자율';
    ctx.font = 'bold 15px "Pretendard", sans-serif';
    ctx.fillStyle = theme.ticketTime || '#1e40af';
    ctx.fillText(displayTime, x + w / 2, contentCenterY + 56);
  }

  // 3. Vintage Floral Swirl Flourish Ornament at bottom
  drawFlourishOrnament(ctx, x + w / 2, y + h - 22, 110, theme.flourishColor || '#8ca3ce');
}

/**
 * Draws vintage ornamental filigree swirl (~o~)
 */
function drawFlourishOrnament(ctx: CanvasRenderingContext2D, cx: number, cy: number, w: number, color: string = '#8ca3ce'): void {
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  // Left swirl
  ctx.moveTo(cx - w / 2, cy);
  ctx.quadraticCurveTo(cx - w / 4, cy - 7, cx - 12, cy);
  // Center loop
  ctx.arc(cx, cy, 3.5, 0, Math.PI * 2);
  // Right swirl
  ctx.moveTo(cx + 12, cy);
  ctx.quadraticCurveTo(cx + w / 4, cy + 7, cx + w / 2, cy);
  ctx.stroke();
}

/**
 * Draws realistic silver key illustration
 */
function drawSilverKey(ctx: CanvasRenderingContext2D, x: number, y: number, length: number): void {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(-0.1);

  // Key Bow / Head
  ctx.fillStyle = '#c5ccd8';
  ctx.strokeStyle = '#7c8899';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(14, 14, 14, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Hole inside key bow
  ctx.fillStyle = '#5570a5';
  ctx.beginPath();
  ctx.arc(14, 14, 5.5, 0, Math.PI * 2);
  ctx.fill();

  // Shaft
  ctx.fillStyle = '#c5ccd8';
  ctx.fillRect(28, 10, length - 28, 8);
  ctx.strokeRect(28, 10, length - 28, 8);

  // Highlights
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(32, 12, length - 36, 1.5);

  // Teeth / Cuts
  const teethX = x + length - 24;
  ctx.fillStyle = '#c5ccd8';
  ctx.fillRect(length - 28, 18, 8, 8);
  ctx.strokeRect(length - 28, 18, 8, 8);
  ctx.fillRect(length - 14, 18, 8, 12);
  ctx.strokeRect(length - 14, 18, 8, 12);

  ctx.restore();
}

function drawScrew(ctx: CanvasRenderingContext2D, x: number, y: number): void {
  ctx.fillStyle = '#7a8c9e';
  ctx.beginPath();
  ctx.arc(x, y, 2.5, 0, Math.PI * 2);
  ctx.fill();
}

function drawTriangle(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, x3: number, y3: number): void {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineTo(x3, y3);
  ctx.closePath();
  ctx.fill();
}

function drawDashedLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, dashes: number[]): void {
  ctx.save();
  ctx.setLineDash(dashes);
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.restore();
}

function drawPerforationHole(ctx: CanvasRenderingContext2D, x: number, y: number, r: number): void {
  ctx.fillStyle = '#d2d7e2';
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();
}

/**
 * Monthly Calendar Boarding Pass View (1600x940)
 */
function renderBoardingPassMonthlyCanvas(
  ctx: CanvasRenderingContext2D,
  data: StreamScheduleData,
  theme: any,
  width: number,
  height: number
): void {
  const padX = 50;
  let topY = 36;

  // Header Bar
  ctx.textAlign = 'left';
  ctx.font = 'bold 26px "Pretendard", sans-serif';
  ctx.fillStyle = theme.textMain || '#263859';
  ctx.fillText(`✈ ${data.monthly.year}년 ${data.monthly.month}월 비행 일정표 (전체 방송 캘린더)`, padX, topY + 24);

  ctx.font = '14px "Pretendard", sans-serif';
  ctx.fillStyle = theme.accent || '#1e40af';
  ctx.fillText(data.channel.noticeMonthly || data.monthly.monthlyGoal || `${data.channel.name}의 월간 방송 일정`, padX, topY + 52);

  // Channel Profile on Right
  const rightX = width - padX;
  ctx.textAlign = 'right';
  ctx.font = 'bold 20px "Pretendard", sans-serif';
  ctx.fillStyle = theme.textMain || '#263859';
  ctx.fillText(`${data.channel.avatarEmoji || '✈️'} ${data.channel.name}`, rightX, topY + 24);

  ctx.font = '13px "Pretendard", sans-serif';
  ctx.fillStyle = theme.textSub || '#5572b9';
  ctx.fillText(data.channel.tagline || '즐거운 방송', rightX, topY + 48);

  topY += 76;

  // Weekday Header Row
  const weekDays = ['MON 월', 'TUE 화', 'WED 수', 'THU 목', 'FRI 금', 'SAT 토', 'SUN 일'];
  const gridW = width - padX * 2;
  const colGap = 8;
  const colW = (gridW - colGap * 6) / 7;
  const headerH = 34;

  weekDays.forEach((w, i) => {
    const x = padX + i * (colW + colGap);
    ctx.fillStyle = (i === 6 && theme.accent) ? theme.accent : (theme.ribbonBg || '#6887d1');
    roundRect(ctx, x, topY, colW, headerH, 6, true, false);

    ctx.textAlign = 'center';
    ctx.font = 'bold 13px "Pretendard", sans-serif';
    ctx.fillStyle = theme.ribbonText || '#ffffff';
    ctx.fillText(w, x + colW / 2, topY + 22);
  });

  topY += headerH + 10;

  // Calendar Grid (35 cells)
  const daysInMonth = new Date(data.monthly.year, data.monthly.month, 0).getDate();
  const firstDayIndex = (new Date(data.monthly.year, data.monthly.month - 1, 1).getDay() + 6) % 7; // Mon=0
  const cellH = 110;
  const rowGap = 8;

  for (let cell = 0; cell < 35; cell++) {
    const r = Math.floor(cell / 7);
    const c = cell % 7;
    const x = padX + c * (colW + colGap);
    const y = topY + r * (cellH + rowGap);
    const dayNum = cell - firstDayIndex + 1;

    if (dayNum >= 1 && dayNum <= daysInMonth) {
      const entry = data.monthly.days[dayNum] || { time: '', status: 'live', title: '' };
      const isOff = entry.status === 'off';

      ctx.fillStyle = theme.ticketBg || theme.cardBg || '#f8fafc';
      ctx.strokeStyle = theme.stripBorder || theme.border || '#b2c4e5';
      ctx.lineWidth = 1;
      roundRect(ctx, x, y, colW, cellH, 8, true, true);

      // Day Number
      ctx.textAlign = 'left';
      ctx.font = 'bold 14px "Pretendard", sans-serif';
      ctx.fillStyle = (c === 6) ? '#f43f5e' : (theme.ticketTitle || theme.textMain || '#344b75');
      ctx.fillText(String(dayNum), x + 10, y + 22);

      // Event Pill if title exists
      if (entry.title && entry.title.trim() !== '') {
        ctx.fillStyle = isOff ? (theme.stubBg || '#e2e7f0') : (theme.cardBg || '#e6eefc');
        ctx.strokeStyle = isOff ? (theme.stubBorder || '#8c9eb5') : (theme.ticketInnerBorder || '#8daee6');
        roundRect(ctx, x + 6, y + 34, colW - 12, 64, 6, true, true);

        ctx.textAlign = 'left';
        ctx.font = 'bold 11px "Pretendard", sans-serif';
        ctx.fillStyle = isOff ? (theme.stubText || '#62768f') : (theme.ticketTime || theme.accent || '#1e40af');
        const cellTime = formatDisplayTime(entry);
        ctx.fillText(cellTime && cellTime !== '휴식' ? `✈ ${cellTime}` : (isOff ? 'OFFLINE' : 'LIVE'), x + 12, y + 52);

        ctx.font = 'bold 12px "Pretendard", sans-serif';
        ctx.fillStyle = theme.ticketTitle || theme.textMain || '#263859';
        ctx.save();
        ctx.beginPath();
        ctx.rect(x + 12, y + 58, colW - 24, 30);
        ctx.clip();
        ctx.fillText(entry.title, x + 12, y + 74);
        ctx.restore();
      }
    } else {
      ctx.fillStyle = 'rgba(240, 244, 252, 0.4)';
      roundRect(ctx, x, y, colW, cellH, 8, true, false);
    }
  }
}

/**
 * Utility: Round Rectangle on HTML5 Canvas
 */
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
  fill: boolean = true,
  stroke: boolean = false
): void {
  if (width < 2 * radius) radius = width / 2;
  if (height < 2 * radius) radius = height / 2;

  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();

  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}
