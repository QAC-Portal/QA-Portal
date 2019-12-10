export class MockKeycloakService {
    public getUsername(): string {
            return 'test username';
    }

    public logout(url?: string): Promise<void> {
        return new Promise<void>(res => res())
    }
}
