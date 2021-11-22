package com.guidelk.tourism.auth.payload.response;

public class JwtResponse {
	private String token;
	private String type = "Bearer";
	private String refreshToken;
	private Integer id;
	private String username;
	private String email;

	public JwtResponse(String token, String refreshToken, Integer id, String username, String email) {
		this.token = token;
		this.type = type;
		this.refreshToken = refreshToken;
		this.id = id;
		this.username = username;
		this.email = email;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getRefreshToken() {
		return refreshToken;
	}

	public void setRefreshToken(String refreshToken) {
		this.refreshToken = refreshToken;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}
}
