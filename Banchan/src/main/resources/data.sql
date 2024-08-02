INSERT INTO users (realname, email, password_hash, phone, role, created_at, is_active, provider, attribute_key)
VALUES ('부산모라행복주택', 'admin46931', 'admin46931!@#', '010-4321-8765', 'ADMIN', NOW(), TRUE, NULL, NULL);

INSERT INTO apartment (code, apartment_name, addr, total_units) VALUES
('APT101', '부산모라행복주택 101동', '부산광역시 사상구 덕상로 117', 150),
('APT102', '부산모라행복주택 102동', '부산광역시 사상구 덕상로 117', 150),
('APT103', '부산모라행복주택 103동', '부산광역시 사상구 덕상로 117', 150);
