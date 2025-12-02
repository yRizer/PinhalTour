/**
 * This file contains regular expressions used for validating QR codes.
 * The regex checks if the QR code starts with 'QR' followed by exactly three digits.
 * 
 * @module src/security/regexs
 * @constant {RegExp} QRCodeRegex
 */
export const QRCodeRegex = /^QR[0-9]{3}$/;